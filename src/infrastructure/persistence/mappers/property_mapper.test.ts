import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("Property Mapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "Casa";
    entity.description = "Uma casa muito bacana";
    entity.maxGuests = 4;
    entity.basePricePerNight = 200;

    const property = PropertyMapper.toDomain(entity);

    expect(property.getId()).toBe("1");
    expect(property.getName()).toBe("Casa");
    expect(property.getDescription()).toBe("Uma casa muito bacana");
    expect(property.getMaxGuests()).toBe(4);
    expect(property.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const entity1 = new PropertyEntity();
    entity1.id = "1";
    entity1.description = "Uma casa muito bacana";
    entity1.maxGuests = 4;
    entity1.basePricePerNight = 200;

    expect(() => PropertyMapper.toDomain(entity1)).toThrow(
      "O nome é obrigatório"
    );

    const entity2 = new PropertyEntity();
    entity2.id = "2";
    entity2.name = "Casa";
    entity2.description = "Uma casa muito bacana";
    entity2.maxGuests = 0;
    entity2.basePricePerNight = 200;

    expect(() => PropertyMapper.toDomain(entity2)).toThrow(
      "O número máximo de hóspedes deve ser maior que zero"
    );
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const property = new Property(
      "2",
      "Apartamento",
      "Apartamento daora",
      5,
      300
    );

    const entity = PropertyMapper.toPersistence(property);

    expect(entity.id).toBe("2");
    expect(entity.name).toBe("Apartamento");
    expect(entity.description).toBe("Apartamento daora");
    expect(entity.maxGuests).toBe(5);
    expect(entity.basePricePerNight).toBe(300);
  });
});
