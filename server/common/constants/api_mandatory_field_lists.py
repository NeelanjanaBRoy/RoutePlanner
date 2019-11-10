class APIMandatoryFieldList(object):
    field_list = {
        'signup': ['email', 'password', 'first_name', 'last_name', 'company_name'],
        'login': ['email', 'password'],
    }

    @staticmethod
    def get_mandatory_field_list(key):
        try:
            return APIMandatoryFieldList.field_list[key]
        except AttributeError:
            return None
