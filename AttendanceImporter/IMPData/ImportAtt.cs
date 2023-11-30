using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
//using System.Linq;
using System.Text;
//using System.Threading.Tasks;
using zkemkeeper;

namespace IMPData
{
   public class ImportAtt
    {
        private bool bIsConnected = false;
        private int iMachineNumber = 5;
        private StringBuilder sb = new StringBuilder();
        public List<string> values = new List<string>();
        public CZKEMClass axCZKEM1 = new CZKEMClass();
        public void Import(bool clear)
        {
            string log = "";
            // string[] conf = File.ReadAllLines("config.dat");
            string ip = "";
            int port = 0;
            string devNo = "";
            int idwErrorCode = 0;

            string sdwEnrollNumber = "";
            int idwVerifyMode = 0;
            int idwInOutMode = 0;
            int idwYear = 0;
            int idwMonth = 0;
            int idwDay = 0;
            int idwHour = 0;
            int idwMinute = 0;
            int idwSecond = 0;
            int idwWorkcode = 0;

            int iGLCount = 0;
            int iIndex = 0;

            //foreach (var item in conf)
            //{
            //    if (item.Split(' ')[0] == "IP:")
            //        ip = item.Split(' ')[1];
            //    else if (item.Split(' ')[0] == "PORT:")
            //        port = Convert.ToInt32(item.Split(' ')[1]);
            //}

            SqlConnection con = new SqlConnection(@"Data Source=SQL5102.site4now.net;Initial Catalog=db_a95b05_erpsystems;User ID=db_a95b05_erpsystems_admin;Password=P@ssw0rd");
            con.Open();
            SqlCommand cmd = new SqlCommand("SELECT * FROM DeviceSettings", con);
            SqlDataReader red = cmd.ExecuteReader();
            SqlConnection con2 = new SqlConnection(@"Data Source=SQL5102.site4now.net;Initial Catalog=db_a95b05_erpsystems;User ID=db_a95b05_erpsystems_admin;Password=P@ssw0rd");
            SqlCommand cmd2 = new SqlCommand();
            cmd2.Connection = con2;

            while (red.Read())
            {
                ip = red.GetString(3);
                port = red.GetInt32(4);
                devNo = red.GetGuid(0).ToString();

                bIsConnected = axCZKEM1.Connect_Net(ip, port);

                if (bIsConnected == true)
                {
                    log += Environment.NewLine + "Current State:Connected";
                    iMachineNumber = 1;//In fact,when you are using the tcp/ip communication,this parameter will be ignored,that is any integer will all right.Here we use 1.
                    axCZKEM1.RegEvent(iMachineNumber, 65535);//Here you can register the realtime events that you want to be triggered(the parameters 65535 means registering all)

                    //Cursor = Cursors.WaitCursor;
                    values.Clear();

                    axCZKEM1.EnableDevice(iMachineNumber, false);//disable the device

                    if (axCZKEM1.ReadGeneralLogData(iMachineNumber))//read all the attendance records to the memory
                    {
                        con2.Open();

                        while (axCZKEM1.SSR_GetGeneralLogData(iMachineNumber, out sdwEnrollNumber, out idwVerifyMode,
                                    out idwInOutMode, out idwYear, out idwMonth, out idwDay, out idwHour, out idwMinute, out idwSecond, ref idwWorkcode))//get records from the memory
                        {
                            iGLCount++;
                            log += iGLCount.ToString();

                            cmd2.CommandText = "INSERT INTO  [dbo].[AttendanceLogFiles] (Id,[EnrollNo],[Year],[Month],[Day],[Hour],[Minute],[Second],[VerifyMode],[InOutMode],[WorkCode],[DeviceSettingId],AttendanceDate) VALUES ('" + Guid.NewGuid() + "' , '" + sdwEnrollNumber + "'," + idwYear.ToString() + "," + idwMonth.ToString()
                                + "," + idwDay.ToString() + "," + idwHour.ToString() + "," + idwMinute.ToString() + "," + idwSecond.ToString() + "," +
                                idwVerifyMode.ToString() + "," + idwInOutMode.ToString() + "," + idwWorkcode.ToString() + ", '" + devNo.ToString() +"' , '" + DateTime.Now.ToString() + "')";

                            cmd2.ExecuteNonQuery();

                            //values.Add(sdwEnrollNumber + "," + idwYear.ToString() + "," + idwMonth.ToString() + "," + idwDay.ToString()
                            //  + "," + idwHour.ToString() + "," + idwMinute.ToString() + "," + idwSecond.ToString() + "," +
                            // idwVerifyMode.ToString() + "," + idwInOutMode.ToString() + "," + idwWorkcode.ToString() + "," + iMachineNumber.ToString());//modify by Darcy on Nov.26 2009

                            iIndex++;
                        }

                        con2.Close();

                        bool chk = false;

                        string[] fl = Directory.GetFiles(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Path.DirectorySeparatorChar + "Result");

                        foreach (var item3 in fl)
                        {
                            if (item3 == "dmv.att")
                                chk = true;
                        }

                        if (!chk)
                        {
                            ExportToFile(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Path.DirectorySeparatorChar + "Result" + Path.DirectorySeparatorChar.ToString() + "dmv.att");
                            //dataGridView1.DataSource = values;

                            if (clear)
                                ClearLog();
                        }

                        values.Clear();
                        //bool upload = false;

                        //FTPClass ft = new FTPClass();
                        //ft.Download(out upload);

                        //if (upload && ft.Upload() != 0)
                        //    log += Environment.NewLine + "Error Upload";
                    }
                    else
                    {
                        //Cursor = Cursors.Default;
                        axCZKEM1.GetLastError(ref idwErrorCode);

                        if (idwErrorCode != 0)
                        {
                            log += Environment.NewLine + "Reading data from terminal failed,ErrorCode: " + idwErrorCode.ToString();
                        }
                        else
                        {
                            log += Environment.NewLine + "No data from terminal returns!";
                        }
                    }

                    axCZKEM1.EnableDevice(iMachineNumber, true);//enable the device
                    //Cursor = Cursors.Default;
                }
                else
                {
                    axCZKEM1.GetLastError(ref idwErrorCode);
                    log += Environment.NewLine + "Unable to connect the device,ErrorCode=" + idwErrorCode.ToString();
                }

                File.AppendAllText("Log.txt", log);
            }

            con.Close();

            if (clear)
                ClearLog();
        }

        public void ClearLog()
        {
            string log = "";

            if (bIsConnected == false)
            {
                log += Environment.NewLine + "Please connect the device first";
                return;
            }
            int idwErrorCode = 0;

            values.Clear();
            axCZKEM1.EnableDevice(iMachineNumber, false);//disable the device

            if (axCZKEM1.ClearGLog(iMachineNumber))
            {
                axCZKEM1.RefreshData(iMachineNumber);//the data in the device should be refreshed
                log += Environment.NewLine + "All att Logs have been cleared from teiminal!";
            }
            else
            {
                axCZKEM1.GetLastError(ref idwErrorCode);
                log += Environment.NewLine + "Operation failed,ErrorCode=" + idwErrorCode.ToString();
            }
            axCZKEM1.EnableDevice(iMachineNumber, true);//enable the device
        }

        public string Export()
        {
            //add value for each property.
            foreach (var value in values)
            {
                sb.Append(value);
                sb.Remove(sb.Length - 1, 1).AppendLine();
            }

            return sb.ToString();
        }

        public void ExportToFile(string path)
        {
            File.WriteAllText(path, Export());
        }
    }
}
