from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SumInputSerializer


class SumView(APIView):
    def post(self, request):
        serializer = SumInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        number1 = serializer.validated_data["number1"]
        number2 = serializer.validated_data["number2"]
        return Response({"result": number1 + number2})
