from rest_framework import serializers

from app.accounts.models import User
# from app.audits.serializers import AuditDisplaySerializer


class UserListDisplaySerializer(serializers.ModelSerializer):
    # audit = AuditDisplaySerializer(many=False, required=False)

    class Meta:
        model = User
        fields = ('user_id', 'email', 'first_name', 'last_name', 'company_name', 'phone_number')
