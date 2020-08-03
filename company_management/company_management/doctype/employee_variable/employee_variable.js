cur_frm.add_fetch('employee','employee_name','full_name');

frappe.ui.form.on("Employee Variable", {
   	validate: function(frm) {
		if (frm.doc.cycle_start >= frm.doc.cycle_end ){
			frappe.msgprint(__('Cycle End Date cannot be before the Cycle Start Date'));
			frappe.validated = false; 
		}
	}
});

frappe.ui.form.on("Employee Variable", "cycle_start",
     function(frm) {
        var d = new Date(frm.doc.cycle_start);
        d.setFullYear(d.getFullYear() + 1);
        d.setDate(d.getDate()-1);
       frm.set_value('cycle_end', d);
       frm.set_value('review_date', d);
	console.log('Cycle End Date:' + d);
});

frappe.ui.form.on("Employee Variable", {
  full_name: function (frm) {
    updateCycle(frm);
  },
  promised_monthly: function(frm) {
    updatePromisedTotal(frm);
  },
  promised_fixed_variable: function(frm) {
   updatePromisedTotal(frm) ;
 },
  promised_variable: function(frm) {
   updatePromisedTotal(frm) ;
 },
  actual_fixed_variable: function(frm){
   updateActualPaidTotal(frm)
 },
  actual_variable: function(frm){
   updateActualPaidTotal(frm);
   //updateActualPercentage(frm);
 },
  epfo_paid: function(frm){
   updateActualPaidTotal(frm);
 },
  holidays: function(frm){
   updateActualPaidTotal(frm);
 },
  gratuity: function(frm){
   updateActualPaidTotal(frm);
 },
 actual_variable_percentage: function(frm){
   updateActualVariable(frm);
 },
 holiday_days: function(frm) {
   updateHoliday(frm);
 }
});

function updateCycle(frm) {
  if (frm.is_new())
  {
    frappe.db.get_value('Employee Variable', { employee: frm.doc.employee }, ['name', 'cycle_end'])
      .then(r => {

        let values = r.message;
        if (values !== undefined) {
          if (values.name != frm.doc.name) {
            var d = new Date(values.cycle_end);
            d.setDate(d.getDate() + 1);
            frm.set_value('cycle_start', d);
          
          }
        }
      })
    }
 

}

function updatePromisedTotal(frm) {
  var total = (frm.doc.promised_monthly * 12) + frm.doc.promised_fixed_variable + frm.doc.promised_variable;
  
  if (total > 0) {
    frm.set_value('promised_total', total);
    console.log('Total Promised:' + total);
    frappe.db.get_value('Employee Variable', { employee: frm.doc.employee }, ['name','promised_total'])
      .then(r => {
        
        let values = r.message;
        if (values !== undefined) {
          if (values.name != frm.doc.name) {
         
            if (values.promised_total > 0) {
              console.log('Previous CTC' + values.promised_total);
              let increment_amount = frm.doc.promised_total - values.promised_total;
              let increment = (increment_amount / values.promised_total) * 100;
              frm.set_value('increment', increment);
            }
          }
        }
      })
  }
}

function updateActualPaidTotal(frm) {
  var actualTotal = frm.doc.actual_fixed_variable + frm.doc.actual_variable - frm.doc.epfo_paid + frm.doc.holidays - frm.doc.gratuity ;
  frm.set_value('total_actual_paid', actualTotal );
  console.log('Total Paid:' + actualTotal);
  
}

function updateActualVariable(frm){
  var per = (frm.doc.promised_variable * frm.doc.actual_variable_percentage)/100 ;
  frm.set_value('actual_variable', per );
}

function  updateActualPercentage(frm) {
  var per = (frm.doc.promised_variable*100)/frm.doc.actual_variable;
  frm.set_value('actual_variable_percentage',per);
}

function  updateHoliday(frm) {
  if(frm.doc.holiday_days != 0)
  {
    var payout = (frm.doc.promised_monthly/30)*frm.doc.holiday_days;
    frm.set_value('holidays', payout);
  }
  
}
