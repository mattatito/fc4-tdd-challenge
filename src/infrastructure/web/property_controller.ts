import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";

export class PropertyController {
  private propertyService: PropertyService;

  constructor(propertyService: PropertyService) {
    this.propertyService = propertyService;
  }

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreatePropertyDTO = {
        name: req.body.name,
        description: req.body.description,
        maxGuests: req.body.maxGuests,
        basePricePerNight: req.body.basePricePerNight,
      };

      if (!dto.name) {
        throw new Error("O nome da propriedade é obrigatório.");
      }
      if (dto.maxGuests <= 0) {
        throw new Error("A capacidade máxima deve ser maior que zero.");
      }
      if (!req.body.basePricePerNight || dto.basePricePerNight <= 0) {
        throw new Error("O preço base por noite é obrigatório.");
      }

      const newProperty = await this.propertyService.createProperty(dto);

      return res.status(201).json({
        message: "Property created successfully!",
        property: {
          id: newProperty.getId(),
          name: newProperty.getName(),
          description: newProperty.getDescription(),
          maxGuests: newProperty.getMaxGuests(),
          basePricePerNight: newProperty.getBasePricePerNight(),
        },
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }
}
