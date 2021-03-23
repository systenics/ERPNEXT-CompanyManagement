// Copyright (c) 2020, Systenics and contributors
// For license information, please see license.txt

cur_frm.add_fetch('employee', 'employee_name', 'full_name');
console.log("Update 4");


/* frappe.ui.form.on('YearlyCTC', {
	// cdt is Child DocType name i.e Quotation Item
	// cdn is the row name for e.g bbfcb8da6a
	item_code(frm, cdt, cdn) {
		let row = frappe.get_doc(cdt, cdn);
		console.log(row);
	}
})

frappe.ui.form.on("YearlyCTC", "validate", function (frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	console.log(child);
	if (child.cycle_start >= child.cycle_end) {
			frappe.msgprint(__('Cycle End Date cannot be before the Cycle Start Date'));
			frappe.validated = false;
	}

}); */

frappe.ui.form.on("YearlyCTC", "cycle_start",
	function (doc, cdt, cdn) {
		//var item = frappe.get_doc(cdt, cdn);
		var child = locals[cdt][cdn];
	//	console.log(child);
		var d = new Date(child.cycle_start);
		d.setFullYear(d.getFullYear() + 1);
		d.setDate(d.getDate() - 1);
		child.cycle_end = d;
		child.review_date = d;
		cur_frm.refresh_field("commitments");
		console.log('Cycle End Date:' + d);
	});

frappe.ui.form.on('YearlyCTC', {
	commitments_add: function (doc, cdt, cdn) {
		var childfields = locals[cdt][cdn];
		// You code here
		console.log(doc.cycle_end);
		console.log("New Row Added");
	},
	promised_monthly: function (doc, cdt, cdn) {
		console.log("promised monthly");
		
		updatePromisedTotal(doc, cdt, cdn);
	},
	promised_fixed_bonus: function (doc, cdt, cdn) {
		console.log("promised fixed bonus");
		
		updatePromisedTotal(doc, cdt, cdn);
	},
	promised_variable_bonus: function (doc, cdt, cdn) {
		console.log("promised variable");
		
		updatePromisedTotal(doc, cdt, cdn);
	},
	actual_fixed_bonus: function (doc, cdt, cdn) {
		updateActualPaidTotal(doc, cdt, cdn)
	},
	actual_variable_bonus: function (doc, cdt, cdn) {
		updateActualPaidTotal(doc, cdt, cdn);
		
	},
	epfo_paid: function (doc, cdt, cdn) {
		updateActualPaidTotal(doc, cdt, cdn);
	},
	holidays: function (doc, cdt, cdn) {
		updateActualPaidTotal(doc, cdt, cdn);
	},
	gratuity: function (doc, cdt, cdn) {
		updateActualPaidTotal(doc, cdt, cdn);
	},
	actual_variable_bonus_percent: function (doc, cdt, cdn) {
		updateActualVariable(doc, cdt, cdn);
		updateActualPaidTotal(doc, cdt, cdn);
	},
	epfo_paid: function (doc, cdt, cdn)  {
		updateActualPaidTotal(doc, cdt, cdn) ;
	},
	holidays: function (doc, cdt, cdn)  {
		updateActualPaidTotal(doc, cdt, cdn);
		
	},
	gratuity: function (doc, cdt, cdn) {
		updateActualPaidTotal(doc, cdt, cdn);
	},
	actual_variable_bonus: function (doc, cdt, cdn) {
		updateActualPercentage(doc, cdt, cdn);
		updateActualPaidTotal(doc, cdt, cdn);
	},
	holiday_days: function (doc, cdt, cdn) {
		updateHoliday(doc, cdt, cdn);
		updateActualPaidTotal(doc, cdt, cdn);
	}
});

function updatePromisedTotal(doc, cdt, cdn) {
	var childfields = locals[cdt][cdn];
	
	var total = (childfields.promised_monthly * 12) + childfields.promised_fixed_bonus + childfields.promised_variable_bonus;
	console.log('Total Promised:' + total);
	if (total > 0) {
		//frm.set_value('promised_total', total);
		childfields.promised_total = total;
		cur_frm.refresh_field("commitments");
		console.log('Total Promised:' + total);
		/* frappe.db.get_value('Employee Variable', { employee: frm.doc.employee }, ['name', 'promised_total'])
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
			}) */
	}
}

function updateActualPaidTotal(doc, cdt, cdn) {
	var childfields = locals[cdt][cdn];
	var actualTotal = childfields.actual_fixed_bonus + childfields.actual_variable_bonus - childfields.epfo_paid + childfields.holidays - childfields.gratuity;
	childfields.total_actual = actualTotal;
	cur_frm.refresh_field("commitments");
	console.log('Total Paid:' + actualTotal);

}

function updateActualVariable(doc, cdt, cdn) {
	var childfields = locals[cdt][cdn];
	var per = (childfields.promised_variable_bonus * childfields.actual_variable_bonus_percent) / 100;
	childfields.actual_variable_bonus = per;
	cur_frm.refresh_field("commitments");
	console.log('Actual Variable Bonus: ' + per);
}

function updateActualPercentage(doc, cdt, cdn) {
	var childfields = locals[cdt][cdn];
	var per = (childfields.promised_variable_bonus * 100) / childfields.actual_variable_bonus;
	childfields.actual_variable_bonus_percent = per;
	cur_frm.refresh_field("commitments");
	console.log('Actual Variable Bonus %: ' + per);
}

function updateHoliday(doc, cdt, cdn) {
	var childfields = locals[cdt][cdn];
	if (childfields.holiday_days != 0) {
		var payout = (childfields.promised_monthly / 30) * childfields.holiday_days;
		childfields.holidays = payout;
		cur_frm.refresh_field("commitments");
		console.log('Holiday: ' + payout);
	}

}


