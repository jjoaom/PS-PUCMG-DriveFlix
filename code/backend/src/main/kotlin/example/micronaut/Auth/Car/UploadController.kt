package example.micronaut.uploads

import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.server.types.files.StreamedFile
import java.nio.file.Files
import java.nio.file.Paths

@Controller("/uploads")
class UploadController {

    @Get("/{nomeArquivo}")
    fun buscarImagem(nomeArquivo: String): HttpResponse<Any> {
        val caminho = Paths.get("/app/uploads").resolve(nomeArquivo)

        if (!Files.exists(caminho)) {
            return HttpResponse.notFound()
        }

        val mediaType = when {
            nomeArquivo.endsWith(".png", true) -> MediaType.IMAGE_PNG_TYPE
            nomeArquivo.endsWith(".jpg", true) -> MediaType.IMAGE_JPEG_TYPE
            nomeArquivo.endsWith(".jpeg", true) -> MediaType.IMAGE_JPEG_TYPE
            else -> MediaType.APPLICATION_OCTET_STREAM_TYPE
        }

        val arquivo = StreamedFile(Files.newInputStream(caminho), mediaType)

        return HttpResponse.ok(arquivo)
    }
}