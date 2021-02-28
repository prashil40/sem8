from rest_framework import status
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view, permission_classes

from bson import ObjectId, errors
import razorpay


rzp_id = "rzp_test_ChfLr3Y9r0dKAx"
rzp_secret = "pLRAz87BzuRk6sqbv0dOJa3k"

client = razorpay.Client(auth=(rzp_id, rzp_secret))