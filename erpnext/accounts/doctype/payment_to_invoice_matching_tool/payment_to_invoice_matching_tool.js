// Copyright (c) 2013, Web Notes Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

cur_frm.add_fetch("account", "company", "company")

cur_frm.cscript.onload_post_render = function(doc) {
	$(cur_frm.get_field("reconcile").input).addClass("btn-info");
}

cur_frm.cscript.refresh = function(doc) {
	cur_frm.set_intro("");
	if(!doc.voucher_no) {
		cur_frm.set_intro(__("Select the Invoice against which you want to allocate payments."));
	} else {
		cur_frm.set_intro(__("Set allocated amount against each Payment Entry and click 'Allocate'."));
	}
}

cur_frm.fields_dict.voucher_no.get_query = function(doc) {
	// TO-do: check for pos, it should not come
	if (!doc.account) msgprint(__("Please select Account first"));
	else {
		return {
			doctype: doc.voucher_type,
			query: "erpnext.accounts.doctype.payment_to_invoice_matching_tool.payment_to_invoice_matching_tool.gl_entry_details",
			filters: {
				"dt": doc.voucher_type,
				"acc": doc.account
			}
		}		
	}
}

cur_frm.cscript.voucher_no  = function(doc, cdt, cdn) {
	return get_server_fields('get_voucher_details', '', '', doc, cdt, cdn, 1)
}