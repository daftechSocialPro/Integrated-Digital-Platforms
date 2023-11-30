using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using IMPData;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.TreeView;

namespace AttendanceImporter
{
    public partial class Form1 : Form
    {
        private DataClassesDataContext context;
        public Form1()
        {

            InitializeComponent();
            dateTimedaily.Value = DateTime.Now;
            context = new DataClassesDataContext();
        }

        private void buttonImport_Click(object sender, EventArgs e)
        {
            if (checkBoxData.Checked)
            {
                ImportAtt att = new ImportAtt();
                att.Import(checkBoxLogDelete.Checked);
            }

            if (checkBoxAtt.Checked)
            {
                AttImport at = new AttImport();
                at.GetAtt(dateTimedaily.Value);
               // at.GetPenality(dateTimedaily.Value);
            }

           // buttonDaySearch_Click(new object(), new EventArgs());

            MessageBox.Show("Data Imported", "Import", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
    }
}
