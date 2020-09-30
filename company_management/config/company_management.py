from __future__ import unicode_literals
from frappe import _

def get_data():
    return [
      {
        "label":_("Company Management"),
        "icon": "octicon octicon-briefcase",
        "items": [
            {
              "type": "doctype",
              "name": "Employee Variable",
              "label": _("Employee Variable"),
              "description": _("Manage Employee Variable and Payout"),
            },
             {
              "type": "doctype",
              "name": "Goal Template",
              "label": _("Goal Template"),
              "description": _("Goal Template"),
            }
          ]
      }
  ]
