package example.micronaut.autentificacao.car

import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Part
import io.micronaut.http.annotation.Post
import io.micronaut.http.multipart.CompletedFileUpload
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.UUID

@Controller("/cars")
class CarController(
    private val carService: CarService
) {

    @Get
    fun listar(): List<CarDTO> {
        return carService.listarTodos()
    }

    @Get("/agente/{agentId}")
    fun listarPorAgente(agentId: Long): List<CarDTO> {
        return carService.listarPorAgente(agentId)
    }

    @Post(consumes = [MediaType.MULTIPART_FORM_DATA])
    fun salvar(
        @Part marca: String,
        @Part modelo: String,
        @Part placa: String,
        @Part status: String,
        @Part preco: Double,
        @Part agentId: Long,
        @Part imagem: CompletedFileUpload
    ): HttpResponse<Car> {

        println("UPLOAD RECEBIDO: ${imagem.filename}")

        val extensao = imagem.filename.substringAfterLast(".", "jpg")
        val nomeArquivo = "${UUID.randomUUID()}.$extensao"

        val pastaUploads = Paths.get("/tmp/uploads")
        Files.createDirectories(pastaUploads)

        val caminhoArquivo = pastaUploads.resolve(nomeArquivo)

        imagem.inputStream.use { input ->
            Files.copy(input, caminhoArquivo, StandardCopyOption.REPLACE_EXISTING)
        }

        val dto = CarDTO(
            id = null,
            marca = marca,
            modelo = modelo,
            placa = placa,
            status = status,
            imagemUrl = "/uploads/$nomeArquivo",
            preco = preco,
            agentId = agentId
        )

        val carroSalvo = carService.salvar(dto)

        return HttpResponse.ok(carroSalvo)
    }
}