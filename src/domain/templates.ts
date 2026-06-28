import type { EventTemplateId } from "./models";

export type FieldKind = "text" | "number" | "currency" | "boolean";

export interface TemplateField {
  id: string;
  kind: FieldKind;
  required: false;
}

const optional = (id: string, kind: FieldKind = "text"): TemplateField => ({
  id,
  kind,
  required: false,
});

export const commonFields: readonly TemplateField[] = [
  optional("price", "currency"),
  optional("delivery"),
  optional("packaging"),
  optional("note"),
];

export const templateFields: Record<EventTemplateId, readonly TemplateField[]> = {
  general: [],
  sourcing: [
    optional("currency"),
    optional("moq", "number"),
    optional("shippingTerms"),
    optional("containerTerms"),
    optional("leadTime"),
  ],
  consumer: [
    optional("vatIncluded", "boolean"),
    optional("domesticDeliveryFee", "currency"),
    optional("minimumOrder", "number"),
  ],
  industrial: [
    optional("specification"),
    optional("certification"),
    optional("adoptionTerms"),
  ],
};

export function fieldsForTemplate(
  templateId: EventTemplateId,
): readonly TemplateField[] {
  return [...commonFields, ...templateFields[templateId]];
}
