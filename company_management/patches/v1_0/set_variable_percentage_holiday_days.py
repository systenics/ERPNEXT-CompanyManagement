from __future__ import unicode_literals
import frappe

def execute():
    emp_variable = frappe.db.get_all('Employee Variable',fields=['name','employee','promised_monthly','promised_variable','actual_variable','holidays'])

    for d in emp_variable:
        variable_percentage = cal_percentage(d)

        holiday_days = cal_holiday(d)

        frappe.db.set_value('Employee Variable',d.name,{
            'actual_variable_percentage': variable_percentage,
            'holiday_days': holiday_days
        } )

        frappe.db.commit()

def cal_percentage(data):
    variable_percentage = 0
    if(data.actual_variable != 0 and data.promised_variable != 0) :
      variable_percentage = (data.actual_variable * 100 ) / data.promised_variable
    
    return variable_percentage

def cal_holiday(data):
    holiday_days = 0
    if(data.holidays != 0) :
        per_day = data.promised_monthly / 30 
        abs_holidays = abs( data.holidays ) / per_day
        if(data.holidays < 0 ) :
          holiday_days = float( "-" + str( abs_holidays ) )
        else :
          holiday_days = data.holidays / per_day
        
    return holiday_days