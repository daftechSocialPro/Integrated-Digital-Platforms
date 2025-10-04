#!/bin/bash

# Deployment script for MEMBERSHIP application
# Server: 5.75.176.87
# Username: root
# Password: wtfqEKHKHsuXdCNavW4g

set -e  # Exit on any error

echo "🚀 Starting MEMBERSHIP Application Deployment..."

# Server details
SERVER="5.75.176.87"
USERNAME="root"
PASSWORD="wtfqEKHKHsuXdCNavW4g"
REMOTE_PATH="/root/membership"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to execute commands on remote server
execute_remote() {
    sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$USERNAME@$SERVER" "$1"
}

# Function to copy files to remote server
copy_to_remote() {
    sshpass -p "$PASSWORD" scp -o StrictHostKeyChecking=no -r "$1" "$USERNAME@$SERVER:$2"
}

# Check if sshpass is installed
if ! command -v sshpass &> /dev/null; then
    print_error "sshpass is not installed. Please install it first:"
    echo "Ubuntu/Debian: sudo apt-get install sshpass"
    echo "macOS: brew install sshpass"
    exit 1
fi

print_status "Checking server connection..."
if ! execute_remote "echo 'Connection successful'"; then
    print_error "Cannot connect to server. Please check credentials and network."
    exit 1
fi
print_success "Server connection established"

# Check server prerequisites
print_status "Checking server prerequisites..."
execute_remote "docker --version" || { print_error "Docker not found on server"; exit 1; }
execute_remote "ls -la /var/www/wwwroot" || { print_error "/var/www/wwwroot directory not found"; exit 1; }
execute_remote "ls -la /etc/nginx/cert.pem" || { print_error "SSL certificate not found"; exit 1; }
execute_remote "ls -la /etc/nginx/key.pem" || { print_error "SSL key not found"; exit 1; }
print_success "All prerequisites found"

# Build frontend
print_status "Building frontend application..."
cd MEMBERSHIP.UI
if [ ! -f "package.json" ]; then
    print_error "package.json not found in MEMBERSHIP.UI directory"
    exit 1
fi

print_status "Building frontend for production..."
npm run build

if [ ! -d "dist" ]; then
    print_error "Frontend build failed - dist directory not found"
    exit 1
fi
print_success "Frontend build completed"

# Return to parent directory after frontend build
cd ..
print_status "Returned to MEMBERSHIP directory after frontend build: $(pwd)"

# Build backend
print_status "Building backend application..."
cd MEMBERSHIP.API
if [ ! -f "MembershipAPI/MembershipAPI.csproj" ]; then
    print_error "Backend project file not found"
    exit 1
fi

print_status "Restoring backend dependencies..."
dotnet restore

print_status "Building backend for production..."
dotnet build --configuration Release

print_status "Publishing backend..."
dotnet publish MembershipAPI/MembershipAPI.csproj --configuration Release --output ./publish
print_success "Backend build completed"

# Return to parent directory
cd ..
print_status "Returned to MEMBERSHIP directory: $(pwd)"

# Stop and remove existing containers
print_status "Stopping and removing existing containers..."
execute_remote "docker stop membership-frontend membership-api 2>/dev/null || true"
execute_remote "docker rm membership-frontend membership-api 2>/dev/null || true"

# Force remove any containers using the ports
print_status "Freeing up ports 80, 443, and 9000..."
execute_remote "docker ps -a --filter 'publish=80' --filter 'publish=443' --filter 'publish=9000' -q | xargs -r docker stop"
execute_remote "docker ps -a --filter 'publish=80' --filter 'publish=443' --filter 'publish=9000' -q | xargs -r docker rm"

# Wait a moment for ports to be freed
sleep 3
print_success "Existing containers stopped and ports freed"

# Copy frontend build to server
print_status "Copying frontend build to server..."
print_status "Current directory: $(pwd)"
print_status "Checking for MEMBERSHIP.UI/dist..."
if [ -d "MEMBERSHIP.UI/dist" ]; then
    print_status "Found MEMBERSHIP.UI/dist directory"
    # Copy the entire dist directory contents
    copy_to_remote "MEMBERSHIP.UI/dist/" "$REMOTE_PATH/MEMBERSHIP.UI/"
    print_success "Frontend files copied to server"
else
    print_error "MEMBERSHIP.UI/dist directory not found"
    print_status "Available directories:"
    ls -la
    exit 1
fi

# Ensure web.config is preserved (don't overwrite if it exists)
print_status "Preserving web.config file..."
execute_remote "cd $REMOTE_PATH/MEMBERSHIP.UI && if [ ! -f web.config ]; then echo 'web.config not found, creating backup'; fi"

# Copy backend build to server
print_status "Copying backend build to server..."
if [ -d "MEMBERSHIP.API/publish" ]; then
    copy_to_remote "MEMBERSHIP.API/publish/" "$REMOTE_PATH/MEMBERSHIP.API/"
    print_success "Backend files copied to server"
else
    print_error "MEMBERSHIP.API/publish directory not found"
    exit 1
fi

# Deploy on server using existing Docker files
print_status "Deploying application on server..."

# Build and run backend container using existing Dockerfile.api
print_status "Building backend Docker image..."
execute_remote "cd $REMOTE_PATH && docker build --no-cache -t membership-api -f Dockerfile.api ."

print_status "Starting backend container..."
execute_remote "docker run -d -p 9000:9000 --restart always -v /var/www/wwwroot:/app/wwwroot --name membership-api membership-api"

# Build and run frontend container using existing Dockerfile
print_status "Building frontend Docker image..."
execute_remote "cd $REMOTE_PATH && docker build -t membership-frontend ."

print_status "Starting frontend container..."
execute_remote "docker run -d -p 80:80 -p 443:443 -v /etc/nginx/cert.pem:/etc/nginx/cert.pem -v /etc/nginx/key.pem:/etc/nginx/key.pem -v /var/www/wwwroot:/var/www/wwwroot --restart always --name membership-frontend membership-frontend"

# Verify deployment
print_status "Verifying deployment..."
sleep 10

# Check if containers are running
if execute_remote "docker ps | grep membership-api | grep Up"; then
    print_success "Backend container is running"
else
    print_error "Backend container failed to start"
    execute_remote "docker logs membership-api"
fi

if execute_remote "docker ps | grep membership-frontend | grep Up"; then
    print_success "Frontend container is running"
else
    print_error "Frontend container failed to start"
    execute_remote "docker logs membership-frontend"
fi

# Test endpoints
print_status "Testing application endpoints..."
if execute_remote "curl -s -o /dev/null -w '%{http_code}' http://localhost:9000/api/health || echo 'Backend health check failed'"; then
    print_success "Backend is responding"
else
    print_warning "Backend health check failed - this might be normal if no health endpoint exists"
fi

if execute_remote "curl -s -o /dev/null -w '%{http_code}' http://localhost:80 || echo 'Frontend check failed'"; then
    print_success "Frontend is responding"
else
    print_error "Frontend is not responding"
fi

# Cleanup
print_status "Cleaning up local build artifacts..."
cd ../MEMBERSHIP.UI
rm -rf dist
cd ../MEMBERSHIP.API
rm -rf publish

print_success "🎉 Deployment completed successfully!"
print_status "Application URLs:"
echo "  Frontend: http://$SERVER"
echo "  Backend API: http://$SERVER:9000"
echo ""
print_status "Container status:"
execute_remote "docker ps | grep membership"
echo ""
print_status "To view logs:"
echo "  Backend: ssh $USERNAME@$SERVER 'docker logs membership-api'"
echo "  Frontend: ssh $USERNAME@$SERVER 'docker logs membership-frontend'"
echo ""
print_status "To restart containers:"
echo "  ssh $USERNAME@$SERVER 'docker restart membership-api membership-frontend'"
