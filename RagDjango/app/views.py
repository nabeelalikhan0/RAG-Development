from django.shortcuts import render,HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from src.rag_service import RAGService

# Create your views here.
def index(request):
    return HttpResponse("hello")

@api_view(["POST"])
def ask(request):
    query = request.data.get("query")
    rag = RAGService()
    rag.index_directory(r"C:\Users\nabee\Downloads\pdf")
    result = rag.ask(query)

    return Response({
        "answer": result[0],
        "metadata": result[1],
        "score": result[2]
    })
