import { describe, expect, it } from "vitest";
import {
  commonFields,
  fieldsForTemplate,
  templateFields,
} from "../../src/domain/templates";

describe("fair templates", () => {
  it("keeps every capture field optional", () => {
    const fields = [
      ...commonFields,
      ...Object.values(templateFields).flat(),
    ];

    expect(fields.every((field) => field.required === false)).toBe(true);
  });

  it("adds sourcing fields without removing common fields", () => {
    const fields = fieldsForTemplate("sourcing").map((field) => field.id);

    expect(fields).toEqual(
      expect.arrayContaining([
        "price",
        "delivery",
        "packaging",
        "note",
        "moq",
        "shippingTerms",
        "containerTerms",
      ]),
    );
  });
});
