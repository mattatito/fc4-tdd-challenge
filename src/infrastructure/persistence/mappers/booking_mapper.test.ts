import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";
import { PropertyMapper } from "./property_mapper";
import { UserMapper } from "./user_mapper";

describe("Booking Mapper", () => {
  let propertyEntity: PropertyEntity;
  let userEntity: UserEntity;

  beforeAll(() => {
    propertyEntity = new PropertyEntity();
    propertyEntity.id = "1";
    propertyEntity.name = "Casa";
    propertyEntity.description = "Uma casa muito bacana";
    propertyEntity.maxGuests = 4;
    propertyEntity.basePricePerNight = 200;

    userEntity = new UserEntity();
    userEntity.id = "1";
    userEntity.name = "Joao Kleber";
  });

  it("deve converter BookingEntity para Booking", () => {
    const dateRange = new DateRange(
      new Date("2025-04-15"),
      new Date("2025-04-20")
    );
    const entity = new BookingEntity();
    entity.id = "1";
    entity.property = propertyEntity;
    entity.guest = userEntity;
    entity.guestCount = 2;
    entity.startDate = dateRange.getStartDate();
    entity.endDate = dateRange.getEndDate();
    entity.status = "CONFIRMED";
    entity.totalPrice = 1000;

    const booking = BookingMapper.toDomain(entity);

    expect(booking.getId()).toBe("1");
    expect(booking.getGuest().getId()).toBe("1");
    expect(booking.getProperty().getId()).toBe("1");
    expect(booking.getGuestCount()).toBe(2);
    expect(booking.getDateRange().getStartDate()).toEqual(
      dateRange.getStartDate()
    );
    expect(booking.getDateRange().getEndDate()).toEqual(dateRange.getEndDate());
    expect(booking.getStatus()).toBe("CONFIRMED");
    expect(booking.getTotalPrice()).toBe(1000);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const dateRange1 = new DateRange(
      new Date("2025-04-15"),
      new Date("2025-04-20")
    );

    const entity = new BookingEntity();
    entity.id = "1";
    entity.property = propertyEntity;
    entity.guest = userEntity;
    entity.guestCount = 0;
    entity.startDate = dateRange1.getStartDate();
    entity.endDate = dateRange1.getEndDate();
    entity.status = "CONFIRMED";
    entity.totalPrice = 1000;

    expect(() => {
      BookingMapper.toDomain(entity);
    }).toThrow("O número de hóspedes deve ser maior que zero.");
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property(
      propertyEntity.id,
      propertyEntity.name,
      propertyEntity.description,
      propertyEntity.maxGuests,
      propertyEntity.basePricePerNight
    );
    const guest = new User("1", "Joao");
    const dateRange = new DateRange(
      new Date("2025-04-15"),
      new Date("2025-04-20")
    );
    const booking = new Booking("1", property, guest, dateRange, 2);

    const entity = BookingMapper.toPersistence(booking);

    expect(entity.id).toBe("1");
    expect(entity.property.id).toBe("1");
    expect(entity.guest.id).toBe("1");
    expect(entity.startDate).toBe(dateRange.getStartDate());
    expect(entity.endDate).toBe(dateRange.getEndDate());
    expect(entity.guestCount).toBe(2);
  });
});
