# -*- coding: utf-8 -*-
# Copyright (c) 2021, Systenics and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

STD_CRITERIA = ["total", "total score", "total grade", "maximum score", "score", "grade", "total rating","rating"]


class KRA(Document):
	def validate(self):
		if self.assessment_criteria.lower() in STD_CRITERIA:
			frappe.throw(_("Can't create standard criteria. Please rename the criteria"))
