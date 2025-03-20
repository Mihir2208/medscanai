from django.http import HttpResponse  # Add this import
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import subprocess
from django.core.files.storage import default_storage

# Add the home view function
def home(request):
    return HttpResponse("Welcome to the MedScanAI Backend!")

class ScanImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        image = request.FILES.get('image')
        image_type = request.data.get('image_type')

        if not image or not image_type:
            return Response({'error': 'Image and image type are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Save the image using Django's default storage
            file_name = default_storage.save(image.name, image)

            # Call the DeepSeek model via Ollama
            result = subprocess.run(
                ['ollama', 'run', 'llama2:13b', default_storage.path(file_name)],
                capture_output=True, text=True
            )

            # Delete the temporary file after processing
            default_storage.delete(file_name)

            return Response({'result': result.stdout}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)