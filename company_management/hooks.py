# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "company_management"
app_title = "Company Management"
app_publisher = "Systenics"
app_description = "App for various Management Functions of the Company"
app_icon = "octicon octicon-file-directory"
app_color = "#589494"
app_email = "info@systenics.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/company_management/css/company_management.css"
# app_include_js = "/assets/company_management/js/company_management.js"

# include js, css files in header of web template
# web_include_css = "/assets/company_management/css/company_management.css"
# web_include_js = "/assets/company_management/js/company_management.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "company_management.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "company_management.install.before_install"
# after_install = "company_management.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "company_management.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"company_management.tasks.all"
# 	],
# 	"daily": [
# 		"company_management.tasks.daily"
# 	],
# 	"hourly": [
# 		"company_management.tasks.hourly"
# 	],
# 	"weekly": [
# 		"company_management.tasks.weekly"
# 	]
# 	"monthly": [
# 		"company_management.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "company_management.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "company_management.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "company_management.task.get_dashboard_data"
# }

fixtures = [{"dt":"Property Setter", "filters": [["doc_type", "in", ("Compensation", "YearlyCTC")]]},
       {"dt":"Custom Field", "filters": [["dt", "in", ("Compensation", "YearlyCTC")]]},
       {"dt":"Custom DocPerm", "filters":[["parent","in", ("Compensation")]]}]

