package example.micronaut.autentificacao.car

import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Produces
import io.micronaut.http.server.types.files.SystemFile
import java.nio.file.Paths

@Controller("/uploads")
class UploadController {

    @Get("/{filename}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    fun buscarImagem(@PathVariable filename: String): HttpResponse<SystemFile> {
        val nomeSeguro = Paths.get(filename).fileName.toString()
        val arquivo = Paths.get("/tmp/uploads").resolve(nomeSeguro).toFile()

        if (!arquivo.exists()) {
            return HttpResponse.notFound()
        }

        return HttpResponse.ok(SystemFile(arquivo))
    }
}