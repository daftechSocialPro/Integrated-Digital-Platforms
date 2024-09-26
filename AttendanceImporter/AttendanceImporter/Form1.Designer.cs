namespace AttendanceImporter
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.buttonImport = new System.Windows.Forms.Button();
            this.checkBoxLogDelete = new System.Windows.Forms.CheckBox();
            this.checkBoxData = new System.Windows.Forms.CheckBox();
            this.checkBoxAtt = new System.Windows.Forms.CheckBox();
            this.dataClassesDataContextBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.dateTimedaily = new System.Windows.Forms.DateTimePicker();
            ((System.ComponentModel.ISupportInitialize)(this.dataClassesDataContextBindingSource)).BeginInit();
            this.SuspendLayout();
            // 
            // buttonImport
            // 
            this.buttonImport.Location = new System.Drawing.Point(12, 92);
            this.buttonImport.Name = "buttonImport";
            this.buttonImport.Size = new System.Drawing.Size(142, 45);
            this.buttonImport.TabIndex = 0;
            this.buttonImport.Text = "Import";
            this.buttonImport.UseVisualStyleBackColor = true;
            this.buttonImport.Click += new System.EventHandler(this.buttonImport_Click);
            // 
            // checkBoxLogDelete
            // 
            this.checkBoxLogDelete.AutoSize = true;
            this.checkBoxLogDelete.Location = new System.Drawing.Point(85, 69);
            this.checkBoxLogDelete.Name = "checkBoxLogDelete";
            this.checkBoxLogDelete.Size = new System.Drawing.Size(82, 17);
            this.checkBoxLogDelete.TabIndex = 1;
            this.checkBoxLogDelete.Text = "LOG Delete";
            this.checkBoxLogDelete.UseVisualStyleBackColor = true;
            // 
            // checkBoxData
            // 
            this.checkBoxData.AutoSize = true;
            this.checkBoxData.Location = new System.Drawing.Point(12, 69);
            this.checkBoxData.Name = "checkBoxData";
            this.checkBoxData.Size = new System.Drawing.Size(49, 17);
            this.checkBoxData.TabIndex = 2;
            this.checkBoxData.Text = "Data";
            this.checkBoxData.UseVisualStyleBackColor = true;
            // 
            // checkBoxAtt
            // 
            this.checkBoxAtt.AutoSize = true;
            this.checkBoxAtt.Location = new System.Drawing.Point(12, 38);
            this.checkBoxAtt.Name = "checkBoxAtt";
            this.checkBoxAtt.Size = new System.Drawing.Size(81, 17);
            this.checkBoxAtt.TabIndex = 4;
            this.checkBoxAtt.Text = "Attendance";
            this.checkBoxAtt.UseVisualStyleBackColor = true;
            // 
            // dataClassesDataContextBindingSource
            // 
            this.dataClassesDataContextBindingSource.DataSource = typeof(AttendanceImporter.DataClassesDataContext);
            // 
            // dateTimedaily
            // 
            this.dateTimedaily.CustomFormat = "yyyy/MM/dd";
            this.dateTimedaily.Format = System.Windows.Forms.DateTimePickerFormat.Custom;
            this.dateTimedaily.Location = new System.Drawing.Point(12, 12);
            this.dateTimedaily.Name = "dateTimedaily";
            this.dateTimedaily.Size = new System.Drawing.Size(194, 20);
            this.dateTimedaily.TabIndex = 3;
            this.dateTimedaily.Value = new System.DateTime(2023, 10, 25, 0, 0, 0, 0);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(333, 155);
            this.Controls.Add(this.checkBoxAtt);
            this.Controls.Add(this.dateTimedaily);
            this.Controls.Add(this.checkBoxData);
            this.Controls.Add(this.checkBoxLogDelete);
            this.Controls.Add(this.buttonImport);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "Form1";
            this.Text = "Daily Attendance importer";
            ((System.ComponentModel.ISupportInitialize)(this.dataClassesDataContextBindingSource)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button buttonImport;
        private System.Windows.Forms.CheckBox checkBoxLogDelete;
        private System.Windows.Forms.CheckBox checkBoxData;
        private System.Windows.Forms.CheckBox checkBoxAtt;
        private System.Windows.Forms.BindingSource dataClassesDataContextBindingSource;
        private System.Windows.Forms.DateTimePicker dateTimedaily;
    }
}

