from rest_framework import serializers


class SumInputSerializer(serializers.Serializer):
    number1 = serializers.FloatField()
    number2 = serializers.FloatField()
