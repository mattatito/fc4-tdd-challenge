import { PropertyService } from "./property_service";
import { FakePropertyRepository } from "../../infrastructure/repositories/fake_property_repository";
import { Property } from "../../domain/entities/property";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";

describe("PropertyService", () => {
  let propertyService: PropertyService;
  let fakePropertyRepository: FakePropertyRepository;

  beforeEach(() => {
    fakePropertyRepository = new FakePropertyRepository();
    propertyService = new PropertyService(fakePropertyRepository);
  });

  it("deve retornar null quando um ID inválido for passado", async () => {
    const property = await propertyService.findPropertyById("999");
    expect(property).toBeNull();
  });

  it("deve retornar uma propriedade quando um ID váilido for fornecido", async () => {
    const property = await propertyService.findPropertyById("1");
    expect(property).not.toBeNull();
    expect(property?.getId()).toBe("1");
    expect(property?.getName()).toBe("Apartamento");
  });

  it("deve salvar uma nova propriedade com sucesso usando repositorio fake e buscando novamente", async () => {
    const newProperty = new Property(
      "3",
      "Test Property",
      "Test Description",
      4,
      100
    );
    await fakePropertyRepository.save(newProperty);

    const property = await propertyService.findPropertyById("3");
    expect(property).not.toBeNull();
    expect(property?.getId()).toBe("3");
    expect(property?.getName()).toBe("Test Property");
  });

  it("deve salvar uma nova propriedade com sucesso usando o service e buscando novamente", async () => {
    const newProperty: CreatePropertyDTO = {
      name: "Casona",
      description: "Casona véia pôdichique",
      maxGuests: 10,
      basePricePerNight: 500,
    };
    const createdProperty = await propertyService.createProperty(newProperty);

    const foundProperty = await propertyService.findPropertyById(
      createdProperty.getId()
    );
    expect(foundProperty).not.toBeNull();
    expect(foundProperty?.getName()).toBe("Casona");
    expect(foundProperty?.getDescription()).toBe("Casona véia pôdichique");
    expect(foundProperty?.getMaxGuests()).toBe(10);
    expect(foundProperty?.getBasePricePerNight()).toBe(500);
  });
});
