// Copyright (c) 2020, Systenics and contributors
// For license information, please see license.txt

cur_frm.add_fetch('employee', 'employee_name', 'full_name');
console.log("Update 4");


frappe.ui.form.on('YearlyCTC', {
	// cdt is Child DocType name i.e Quotation Item
	// cdn is the row name for e.g bbfcb8da6a
	item_code(frm, cdt, cdn) {
		let row = frappe.get_doc(cdt, cdn);
		console.log(row);
	}
})

frappe.ui.form.on("Compensation", "validate", function (frm, cdt, cdn) {
	var child = locals[cdt][cdn];
	console.log(child);
	if (child.cycle_start >= child.cycle_end) {
			frappe.msgprint(__('Cycle End Date cannot be before the Cycle Start Date'));
			frappe.validated = false;
	}

});

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