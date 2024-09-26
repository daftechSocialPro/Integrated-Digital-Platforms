using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AttendanceImporter
{
    public class AttImport
    {
        private DataClassesDataContext context;
        private List<string> PassedDinner;

        public void GetAtt(DateTime daily)
        {
            context = new DataClassesDataContext();
           // PassedDinner = new List<string>();
            DateTime chkdate;

            try
            {
                var delatt = (from x in context.EmployeeAttendances
                              where x.AttendanceDate.Equals(daily.Date)
                              select x).ToList();
                if (delatt.Count > 0)
                {
                    context.EmployeeAttendances.DeleteAllOnSubmit(delatt);
                    context.SubmitChanges();
                }
                var delot = (from x in context.OverTimes
                             where x.OverTimeDate.Equals(daily.Date)
                             select x).ToList();
                if (delot.Count > 0)
                {
                    context.OverTimes.DeleteAllOnSubmit(delot);
                    context.SubmitChanges();
                }
                var q = (from x in context.EmployeeFingerPrints
                         where x.Employee.EmploymentStatus.Equals(0) 
                         select x).ToList();
                foreach (var item in q)
                {
                   
                        var attlog = (from x in context.AttendanceLogFiles
                                      where x.EnrollNo.Equals(item.FingerPrintCode) && x.Day.Equals(daily.Day) && x.Month.Equals(daily.Month) && x.Year.Equals(daily.Year)
                                      select x).OrderBy(x => x.Hour).ThenBy(x => x.Minute).ThenBy(x => x.Second).ToList();
                        if (attlog.Count > 0)
                        {
                            double ots = 0;
                            foreach (var attl in attlog)
                            {
                                chkdate = new DateTime(attl.Year, attl.Month, attl.Day);

                                var qa = (from x in context.EmployeeAttendances
                                          where x.FingerPrintId.Equals(item.Id) &&
                                          x.AttendanceDate.Date.CompareTo(chkdate) == 0
                                          select x.Id).ToList();
                                var qs = (from x in context.EmployeeShifts
                                          where x.Id.Equals(item.EmployeeId)
                                          select x.ShiftListId).ToList();
                                var qb = (from y in context.ShiftLists
                                          where y.Id.Equals(qs[0])
                                          select y).ToList();
                                #region Hoilday

                                var hl = (from x in context.Holidays
                                          select x.Date).ToList();

                                if (hl.Contains(chkdate.Date))
                                {
                                    if (qa.Count == 0)
                                    {
                                    EmployeeAttendance att = new EmployeeAttendance()
                                    {
                                            Id = Guid.NewGuid(),
                                            CreatedDate = DateTime.Now,
                                            Rowstatus = 0,
                                            AttendanceDate = chkdate,
                                            CheckIn = new TimeSpan(attl.Hour, attl.Minute, attl.Second),
                                            FingerPrintId = item.Id,
                                            AttencanceType = "Holiday"
                                        };

                                        context.EmployeeAttendances.InsertOnSubmit(att);
                                        context.SubmitChanges();
                                    }

                                    else if (qa.Count > 0)
                                    {
                                        ots = 0;

                                        var qau = from x in context.EmployeeAttendances
                                                  where x.EmployeeFingerPrint.FingerPrintCode.Equals(item.FingerPrintCode) && x.AttendanceDate.Date.CompareTo(chkdate) == 0
                                                  select x;

                                        foreach (var item2 in qau)
                                        {
                                            item2.CheckOut = new TimeSpan(attl.Hour, attl.Minute, attl.Second);
                                            TimeSpan checkin = new TimeSpan(item2.CheckIn.Hours, item2.CheckIn.Minutes, item2.CheckIn.Seconds);
                                            TimeSpan checkout = new TimeSpan(attl.Hour, attl.Minute, attl.Second);
                                            TimeSpan tothours = checkout - checkin;
                                            item2.TotalTime = tothours;
                                            ots = new TimeSpan(attl.Hour, attl.Minute, attl.Second).Subtract(item2.CheckIn).TotalMinutes / 60;
                                        }

                                        context.SubmitChanges();

                                        OverTime ot = new OverTime()
                                        {
                                            Id = Guid.NewGuid(),
                                            CreatedDate = DateTime.Now,
                                            Rowstatus = 0,
                                            HolidayOT = ots,
                                            OverTimeDate = chkdate,
                                            EmployeeId = item.EmployeeId,
                                            Approved = false
                                        };

                                        context.OverTimes.InsertOnSubmit(ot);
                                        context.SubmitChanges();
                                    }

                                    continue;
                                }

                                #endregion

                                //#region Dayoff

                                //var qd = (from x in context.DayOffs
                                //          where x.EmployeeId.Equals(item.EmployeeId)
                                //          select x.DayOffDay).ToList();

                                //if (qd.Contains(chkdate.ToString("dddd")))
                                //{
                                //    if (qa.Count == 0)
                                //    {
                                //        EmployeeAttendance att = new EmployeeAttendance()
                                //        {
                                //            Id = Guid.NewGuid(),
                                //            CreatedDate = DateTime.Now,
                                //            Rowstatus = 0,
                                //            AttendanceDate = chkdate,
                                //            CheckIn = new TimeSpan(attl.Hour, attl.Minute, attl.Second),
                                //            FingerPrintId = item.Id,
                                //            AttencanceType = "day off"
                                //        };

                                //        context.Attendances.InsertOnSubmit(att);
                                //        context.SubmitChanges();
                                //    }

                                //    else if (qa.Count > 0)
                                //    {
                                //        ots = 0;

                                //        var qau = from x in context.Attendances
                                //                  where x.FingerPrintId.Equals(item.Id) && x.AttendanceDate.Date.CompareTo(chkdate) == 0
                                //                  select x;

                                //        foreach (var item2 in qau)
                                //        {
                                //            item2.CheckOut = new TimeSpan(attl.Hour, attl.Minute, attl.Second);
                                //            TimeSpan checkin = new TimeSpan(item2.CheckIn.Hours, item2.CheckIn.Minutes, item2.CheckIn.Seconds);
                                //            TimeSpan checkout = new TimeSpan(attl.Hour, attl.Minute, attl.Second);
                                //            TimeSpan tothours = checkout - checkin;
                                //            item2.TotalTime = tothours;
                                //            ots = new TimeSpan(attl.Hour, attl.Minute, attl.Second).Subtract(item2.CheckIn).TotalMinutes / 60;
                                //        }

                                //        context.SubmitChanges();

                                //        OverTime ot = new OverTime()
                                //        {
                                //            Id = Guid.NewGuid(),
                                //            CreatedDate = DateTime.Now,
                                //            Rowstatus = 0,
                                //            DayoffOT = ots,
                                //            OverTimeDate = chkdate,
                                //            EmployeeId = item.EmployeeId,
                                //            Approved = false
                                //        };

                                //        context.OverTimes.InsertOnSubmit(ot);
                                //        context.SubmitChanges();
                                //    }

                                //    continue;
                                //}
                                //#endregion

                                #region Shift Based
                                var attshf = (from x in context.EmployeeAttendances
                                              where x.AttendanceDate.Equals(chkdate) && x.FingerPrintId.Equals(item.Id)
                                              select x).ToList();
                                if (attshf.Count == 0)
                                {
                                    EmployeeAttendance attend1 = new EmployeeAttendance()
                                    {
                                        Id = Guid.NewGuid(),
                                        CreatedDate = DateTime.Now,
                                        Rowstatus = 0,
                                        CheckIn = new TimeSpan(attl.Hour, attl.Minute, attl.Second),
                                        AttendanceDate = chkdate,
                                        FingerPrintId = item.Id,
                                        AttencanceType = "NSP",
                                    };
                                    context.EmployeeAttendances.InsertOnSubmit(attend1);
                                    context.SubmitChanges();
                                }
                                else
                                {
                                var workingHours = Math.Abs((qb[0].CheckOut.Subtract(qb[0].CheckIn)).TotalMinutes);
                                    foreach (var attend2 in attshf)
                                    {
                                        attend2.CheckOut = new TimeSpan(attl.Hour, attl.Minute, attl.Second);
                                        attend2.TotalTime = new TimeSpan(attl.Hour, attl.Minute, attl.Second) - new TimeSpan(attend2.CheckIn.Hours, attend2.CheckIn.Minutes, attend2.CheckIn.Seconds);
                                        ots = (new TimeSpan(attl.Hour, attl.Minute, attl.Second) - new TimeSpan(attend2.CheckIn.Hours, attend2.CheckIn.Minutes, attend2.CheckIn.Seconds)).TotalMinutes;
                                        if (ots >= workingHours)
                                            attend2.AttencanceType = "FD";
                                        else if (ots > workingHours/2 && ots < workingHours)
                                            attend2.AttencanceType = "HD";
                                        else
                                            attend2.AttencanceType = "EP";
                                    }
                                    context.SubmitChanges();


                                   var currentDay = DateTime.Now.DayOfWeek;

                                var currentBreakTime = context.ShiftDetails.FirstOrDefault(X => X.ShiftId == qb.First().Id && X.WeekDays == currentDay.ToString());
                                    
                                    double breaktime =  (ots - currentBreakTime.BreakTime * 60) / 60;

                                    if (breaktime > 8)
                                    {
                                        OverTime ot = new OverTime()
                                        {
                                            Id = Guid.NewGuid(),
                                            CreatedDate = DateTime.Now,
                                            Rowstatus = 0,
                                            NormalOT = breaktime - 8.0,
                                            OverTimeDate = daily.Date,
                                            Approved = false,
                                            EmployeeId = item.EmployeeId,
                                        };

                                        context.OverTimes.InsertOnSubmit(ot);
                                        context.SubmitChanges();
                                    }
                                }
                                #endregion
                            }

                        }
                        else
                        {
                            EmployeeAttendance attAbsent;
                            var ql = (from x in context.EmployeeLeaves
                                      where x.EmployeeId.Equals(item.EmployeeId)
                                      &&  x.ToDate.Date.CompareTo(daily.Date) > 0
                                      select x.Id).ToList();

                            //var qdo = (from x in context.DayOffs
                            //           where x.EmployeeId.Equals(item.EmployeeId)
                            //           select x.DayOffDay.ToLower()).ToList();

                            var qhl = (from x in context.Holidays
                                       select x.Date.Date).ToList();

                            if (ql.Count > 0)
                            {
                                attAbsent = new EmployeeAttendance()
                                {
                                    Id = Guid.NewGuid(),
                                    CreatedDate = DateTime.Now,
                                    Rowstatus = 0,
                                    AttendanceDate = daily.Date,
                                    FingerPrintId = item.Id,
                                    AttencanceType = "ON Leave"
                                };

                                context.EmployeeAttendances.InsertOnSubmit(attAbsent);
                            }
                            //else if (qdo.Contains(daily.Date.DayOfWeek.ToString().ToLower()))
                            //{
                            //    attAbsent = new Attendance()
                            //    {
                            //        Id = Guid.NewGuid(),
                            //        CreatedDate = DateTime.Now,
                            //        Rowstatus = 0,
                            //        AttendanceDate = daily.Date,
                            //        FingerPrintId = item.Id,
                            //        AttencanceType = "day off"
                            //    };

                            //    context.Attendances.InsertOnSubmit(attAbsent);
                            //}

                            else if (qhl.Contains(daily.Date))
                            {
                                attAbsent = new EmployeeAttendance()
                                {

                                    Id = Guid.NewGuid(),
                                    CreatedDate = DateTime.Now,
                                    Rowstatus = 0,
                                    AttendanceDate = daily.Date,
                                    FingerPrintId = item.Id,
                                    AttencanceType = "Holiday"
                                };

                                context.EmployeeAttendances.InsertOnSubmit(attAbsent);
                            }
                            else
                            {
                                attAbsent = new   EmployeeAttendance()
                                {
                                    Id = Guid.NewGuid(),
                                    CreatedDate = DateTime.Now,
                                    Rowstatus = 0,
                                    AttendanceDate = daily.Date,
                                    FingerPrintId = item.Id,
                                    AttencanceType = "AB"
                                };

                                context.EmployeeAttendances.InsertOnSubmit(attAbsent);
                            }
                        }

                        context.SubmitChanges();
                }
            }
            catch (Exception ex)
            {
                if (!Directory.Exists(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Path.DirectorySeparatorChar + "AttLog"))
                    Directory.CreateDirectory(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Path.DirectorySeparatorChar + "AttLog");

                File.WriteAllText(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Path.DirectorySeparatorChar
                    + "AttLog" + Path.DirectorySeparatorChar + "logGetUpload_Error.txt",
                    ex.Message + " " + DateTime.Now.ToShortDateString() + Environment.NewLine);
            }
        }

        public void GetPenality(DateTime pendate)
        {
            //context = new DataClassesDataContext();
            //try
            //{
            //    var chk = (from x in context.tbl_Penalities
            //               where x.penDate.Equals(pendate.Date)
            //               select x).ToList();
            //    if (chk.Count > 0)
            //    {
            //        context.tbl_Penalities.DeleteAllOnSubmit(chk);
            //        context.SubmitChanges();
            //    }
            //        tbl_Penality pen;
            //        decimal amtTran = 0;
            //        decimal amtTranTax = 0;
            //        decimal amtinc = 0;
            //        var q2 = (from x in context.tbl_Attendaces
            //                  where x.attDate.Equals(pendate.Date)
            //                  select x).ToList();
                    
            //        tbl_Penality pen2;
            //        decimal amtTran2 = 0;
            //        decimal totalhrs = 0;
            //        decimal amtnontax2 = 0;

            //        foreach (var item in q2)
            //        {
            //            amtTran = 0;
            //            amtinc = 0;
            //            amtTranTax = 0;
            //            amtTran2 = 0;
            //            amtnontax2 = 0;
            //            if (item.attType == "AB" || item.attType == "NSP")
            //            {
            //                if (item.tbl_bindEmp.tbl_Employee.status == "Active")
            //                {
            //                    var inc = (from x in context.tbl_Allowances
            //                               where x.empId.Equals(item.tbl_bindEmp.empId)
            //                               select x).ToList();
            //                    foreach (var item2 in inc)
            //                    {
            //                        if (item2.tbl_AllDecType.allDecName == "Transport" && item2.noneTax == true)
            //                            amtTran = item2.amount / 26;
            //                        else if (item2.tbl_AllDecType.allDecName == "Transport" && item2.noneTax == false)
            //                            amtTranTax = item2.amount / 26;
            //                        else if (item2.tbl_AllDecType.allDecName == "Incentive")
            //                            amtinc = item2.amount / 26;
            //                    }
            //                }
            //                amtTranTax = Math.Round(amtTranTax, 2);
            //                amtTran = Math.Round(amtTran, 2);
            //                amtinc = Math.Round(amtinc, 2);
            //                pen = new tbl_Penality()
            //                {
            //                    penType = item.attType,
            //                    amount = item.tbl_bindEmp.tbl_Employee.salary / 26,
            //                    totalHours = 1,
            //                    approved = true,
            //                    empid = item.tbl_bindEmp.tbl_Employee.empId,
            //                    penDate = item.attDate,
            //                    transportAmount = amtTran,
            //                    incentive = amtinc,
            //                    transportTax = amtTranTax,
            //                    approveince = true,
            //                };

            //                context.tbl_Penalities.InsertOnSubmit(pen);
            //                context.SubmitChanges();
            //            }

            //            else
            //            {
            //                if (item.tbl_bindEmp.tbl_Employee.status == "Active" && item.attType != "day off" && item.attType != "Holiday")
            //                {
            //                    var shf = (from x in context.tbl_Shifts
            //                               where x.shiftID.Equals(item.tbl_bindEmp.tbl_Employee.shift)
            //                               select x).ToList();

            //                    var div = (from x in context.tbl_Departments
            //                               where x.DeptId.Equals(item.tbl_bindEmp.tbl_Employee.DeptId)
            //                               select x).ToList();

            //                    double first = 0d;
            //                    double second = 0d;
            //                    foreach (var please in shf)
            //                    {
            //                        second = Math.Round(Convert.ToDouble(shf[0].checkInDay.TotalMinutes), 2);
            //                    }
            //                    first = Math.Round(Convert.ToDouble(item.checkIn.Value.TotalMinutes), 2);

            //                    if (first > second + 3)
            //                    {
            //                        totalhrs = Convert.ToDecimal(first - second);

            //                        var inc = (from x in context.tbl_Allowances
            //                                   where x.empId.Equals(item.tbl_bindEmp.empId) && x.tbl_AllDecType.allDecName.Equals("Transport") && x.noneTax == false
            //                                   select x).ToList();
            //                        var incnt = (from x in context.tbl_Allowances
            //                                     where x.empId.Equals(item.tbl_bindEmp.empId) && x.tbl_AllDecType.allDecName.Equals("Transport") && x.noneTax == true
            //                                     select x).ToList();
            //                        if (inc.Count > 0)
            //                        {
            //                            foreach (var item3 in inc)
            //                            {
            //                                amtTran2 = (item3.amount / 26) / 2;
            //                            }
            //                        }
            //                        else if (incnt.Count > 0)
            //                        {
            //                            foreach (var item3 in incnt)
            //                            {
            //                                amtnontax2 = (item3.amount / 26) / 2;
            //                            }
            //                        }
                                   
            //                        amtTran2 = Math.Round(amtTran2, 2);
            //                        amtnontax2 = Math.Round(amtnontax2, 2);
            //                        pen2 = new tbl_Penality()
            //                        {
            //                            penType = "Late",
            //                            amount = 0,
            //                            totalHours = totalhrs,
            //                            approved = false,
            //                            empid = item.tbl_bindEmp.tbl_Employee.empId,
            //                            penDate = item.attDate,
            //                            transportTax = amtTran2 ,
            //                            transportAmount = amtnontax2,
            //                            approveince = true,
            //                        };

            //                        context.tbl_Penalities.InsertOnSubmit(pen2);
            //                        context.SubmitChanges();
            //                    }
            //                }
            //            }

            //        }
                
            //}


            //catch (Exception)
            //{

            //}

        }


        public void GetUpload()
        {
            //try
            //{
            //    string[] files = Directory.GetFiles(@"C:\inetpub\wwwroot\Nestel\Upload");
            //    string[] lines;

            //    context = new DataClassesDataContext();
            //    tbl_AttLog att;

            //    foreach (var item in files)
            //    {
            //        lines = File.ReadAllLines(item);

            //        foreach (var item2 in lines)
            //        {
            //            att = new tbl_AttLog()
            //            {
            //                enrollNo = item2.Split(',')[0],
            //                year = Convert.ToInt32(item2.Split(',')[1]),
            //                month = Convert.ToInt32(item2.Split(',')[2]),
            //                day = Convert.ToInt32(item2.Split(',')[3]),
            //                hour = Convert.ToInt32(item2.Split(',')[4]),
            //                mint = Convert.ToInt32(item2.Split(',')[5]),
            //                sec = Convert.ToInt32(item2.Split(',')[6]),
            //                verifyMode = Convert.ToInt32(item2.Split(',')[7]),
            //                inOutMode = Convert.ToInt32(item2.Split(',')[8]),
            //                workCode = Convert.ToInt32(item2.Split(',')[9]),
            //                DeviceNo = Convert.ToInt32(item2.Split(',')[10]),
            //                attendaceDate = new DateTime(Convert.ToInt32(item2.Split(',')[1]), Convert.ToInt32(item2.Split(',')[2]),
            //                    Convert.ToInt32(item2.Split(',')[3]), Convert.ToInt32(item2.Split(',')[4]),
            //                    Convert.ToInt32(item2.Split(',')[5]), Convert.ToInt32(item2.Split(',')[6]))
            //            };

            //            context.tbl_AttLogs.InsertOnSubmit(att);
            //        }

            //        context.SubmitChanges();
            //        File.Delete(item);
            //    }
            //}
            //catch (Exception ex)
            //{
            //    if (!Directory.Exists(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Path.DirectorySeparatorChar + "AttLog"))
            //        Directory.CreateDirectory(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Path.DirectorySeparatorChar + "AttLog");

            //    File.WriteAllText(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments) + Path.DirectorySeparatorChar
            //        + "AttLog" + Path.DirectorySeparatorChar + "logGetUpload_Error.txt",
            //        ex.Message + " " + DateTime.Now.ToShortDateString() + Environment.NewLine);
            //}
        }

    }
}
