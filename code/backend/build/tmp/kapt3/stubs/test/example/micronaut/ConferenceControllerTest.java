package example.micronaut;

@io.micronaut.test.extensions.junit5.annotation.MicronautTest()
@kotlin.Metadata(mv = {1, 9, 0}, k = 1, xi = 48, d1 = {"\u0000\u0018\n\u0002\u0018\u0002\n\u0002\u0010\u0000\n\u0000\n\u0002\u0018\u0002\n\u0002\b\u0004\n\u0002\u0010\u0002\n\u0000\b\u0007\u0018\u00002\u00020\u0001B\u000f\u0012\b\b\u0001\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\u0002\u0010\u0004J\b\u0010\u0007\u001a\u00020\bH\u0007R\u0011\u0010\u0002\u001a\u00020\u0003\u00a2\u0006\b\n\u0000\u001a\u0004\b\u0005\u0010\u0006\u00a8\u0006\t"}, d2 = {"Lexample/micronaut/ConferenceControllerTest;", "", "client", "Lio/micronaut/http/client/HttpClient;", "(Lio/micronaut/http/client/HttpClient;)V", "getClient", "()Lio/micronaut/http/client/HttpClient;", "testHello", "", "default_test"})
public final class ConferenceControllerTest {
    @org.jetbrains.annotations.NotNull()
    private final io.micronaut.http.client.HttpClient client = null;
    
    public ConferenceControllerTest(@io.micronaut.http.client.annotation.Client(value = "/")
    @org.jetbrains.annotations.NotNull()
    io.micronaut.http.client.HttpClient client) {
        super();
    }
    
    @org.jetbrains.annotations.NotNull()
    public final io.micronaut.http.client.HttpClient getClient() {
        return null;
    }
    
    @org.junit.jupiter.api.Test()
    public final void testHello() {
    }
}