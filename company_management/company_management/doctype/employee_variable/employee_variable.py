# -*- coding: utf-8 -*-
# Copyright (c) 2020, Systenics and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

class EmployeeVariable(Document):
    def validate(self):
      if(self.promised_variable > 0) :
        self.actual_variable_percentage = (self.actual_variable * 100 ) / self.promised_variable

      if(self.holidays != 0) :
        per_day = self.promised_monthly / 30 
        abs_holidays = abs( self.holidays ) / per_day
        if(self.holidays < 0 ) :
          self.holiday_days = float( "-" + str( abs_holidays ) )
        else :
          self.holiday_days = self.holidays / per_day
