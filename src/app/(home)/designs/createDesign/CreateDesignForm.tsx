"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Upload, ImageIcon, FileText, Plus, X } from "lucide-react";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const rateDropSchema = z.object({
  dropName: z
    .string()
    .min(1, "Drop name is required")
    .refine((val) => {
      if (!val) return true;
      const words = val.split(" ");
      const articles = ["a", "an", "the", "of", "in", "on", "at", "to"];
      return words.every((word, index) => {
        if (index === 0) {
          return /^[A-Z]/.test(word);
        }
        if (articles.includes(word.toLowerCase())) {
          return /^[a-z]/.test(word);
        }
        return /^[A-Z]/.test(word);
      });
    }, "All words except articles must be capitalized"),
  rateValue: z
    .string()
    .min(1, "Rate value is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Must be a positive number"),
  rateUnit: z.enum(["h", "custom"]),
  customUnit: z.union([z.string(), z.literal("")]),
  condition: z.union([z.string(), z.literal("")]).refine((val) => {
    if (!val) return true;
    return val === val.toLowerCase();
  }, "Condition must be lowercase (e.g., 'with looting III')"),
  externalFactor: z.union([z.string(), z.literal("")]).refine((val) => {
    if (!val) return true;
    return val === val.toLowerCase();
  }, "External factor must be lowercase (e.g., 'cat', 'chunk')"),
  alternateInterval: z.union([z.string(), z.literal("")]),
  alternateValue: z.union([z.string(), z.literal("")]).refine((val) => {
    if (!val) return true;
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Must be a positive number"),
  note: z.union([z.string(), z.literal("")]),
});

const rateVariantSchema = z.object({
  variantName: z
    .string()
    .min(1, "Variant name is required")
    .refine((val) => {
      const versionPattern = /^(Java|Bedrock)\s+1\.\d+(\+|-1\.\d+)?$/i;
      if (val === "Default") return true;
      if (versionPattern.test(val)) return true;
      return val === val.toLowerCase();
    }, 'Must be "Default", version format (e.g., "Java 1.19+"), or lowercase condition (e.g., "with 10 bees")'),
  drops: z
    .array(rateDropSchema)
    .min(1, "At least one drop is required per variant"),
});

const ratesSchema = z.object({
  variants: z
    .array(rateVariantSchema)
    .min(1, "At least one variant is required"),
  consumedResources: z.array(rateDropSchema),
  variabilityNote: z.union([z.string(), z.literal("")]),
  additionalNotes: z.union([z.string(), z.literal("")]),
});

const designersSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be at most 100 characters"),
  categories: z.string().min(1, "At least one category is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),
  designers: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Designer name must be at least 2 characters")
          .max(100, "Designer name must be at most 100 characters"),
        url: z
          .string()
          .optional()
          .or(z.literal(""))
          .refine(
            (val) => {
              if (!val) return true;
              if (val.includes("?si=")) {
                return false;
              }
              try {
                new URL(val);
                return true;
              } catch {
                return false;
              }
            },
            {
              message:
                "Must be a valid URL without trailing metadata (remove ?si= and similar parameters)",
            }
          ),
        contributions: z
          .string()
          .max(200, "Contributions must be at most 200 characters")
          .optional()
          .or(z.literal(""))
          .refine(
            (val) => {
              if (!val) return true;
              const parts = val.split(",").map((s) => s.trim());
              return parts.every((part) => {
                if (part.length === 0) return false;
                return (
                  /^[A-Z]/.test(part) &&
                  part.slice(1) === part.slice(1).toLowerCase() &&
                  !part.endsWith(".")
                );
              });
            },
            {
              message:
                "Each contribution must start with uppercase, rest lowercase, no periods (separate with commas)",
            }
          ),
      })
    )
    .min(1, "At least one designer is required"),
  credits: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Credit name must be at least 2 characters")
          .max(100, "Credit name must be at most 100 characters"),
        url: z
          .string()
          .optional()
          .or(z.literal(""))
          .refine(
            (val) => {
              if (!val) return true;
              if (val.includes("?si=")) {
                return false;
              }
              try {
                new URL(val);
                return true;
              } catch {
                return false;
              }
            },
            {
              message:
                "Must be a valid URL without trailing metadata (remove ?si= and similar parameters)",
            }
          ),
        contributions: z
          .string()
          .min(1, "Contributions are required for credits")
          .max(200, "Contributions must be at most 200 characters")
          .refine(
            (val) => {
              const parts = val.split(",").map((s) => s.trim());
              return parts.every((part) => {
                if (part.length === 0) return false;
                return (
                  /^[A-Z]/.test(part) &&
                  part.slice(1) === part.slice(1).toLowerCase() &&
                  !part.endsWith(".")
                );
              });
            },
            {
              message:
                "Each contribution must start with uppercase, rest lowercase, no periods (separate with commas)",
            }
          ),
      })
    )
    .optional(),
  versions: z
    .array(
      z.object({
        startVersion: z.string().min(1, "Start version is required"),
        rangeType: z.enum(["current", "until", "single"]),
        endVersion: z.string().optional().or(z.literal("")),
        modifier: z.enum(["none", "with-modifications", "see-thread"]),
        modifierDetails: z.string().optional().or(z.literal("")),
      })
    )
    .min(1, "At least one version range is required"),
  rates: ratesSchema,
});
type FormData = z.infer<typeof designersSchema>;

interface FieldError {
  name?: string;
  url?: string;
  contributions?: string;
}

interface RateDropError {
  dropName?: string;
  rateValue?: string;
  rateUnit?: string;
  customUnit?: string;
  condition?: string;
  externalFactor?: string;
  alternateInterval?: string;
  alternateValue?: string;
  note?: string;
}

interface RateVariantError {
  variantName?: string;
  drops?: string | RateDropError[];
}

interface RatesError {
  variants?: string | RateVariantError[];
  consumedResources?: string | RateDropError[];
  variabilityNote?: string;
  additionalNotes?: string;
}

interface VersionError {
  startVersion?: string;
  endVersion?: string;
  modifierDetails?: string;
}

interface FormErrors {
  title?: string;
  categories?: string;
  description?: string;
  designers?: string | FieldError[];
  credits?: string | FieldError[];
  versions?: string | VersionError[];
  rates?: RatesError;
}

type VersionRange = {
  startVersion: string;
  rangeType: "current" | "until" | "single";
  endVersion: string;
  modifier: "none" | "with-modifications" | "see-thread";
  modifierDetails: string;
};

type RateDrop = {
  dropName: string;
  rateValue: string;
  rateUnit: "h" | "custom";
  customUnit: string;
  condition: string;
  externalFactor: string;
  alternateInterval: string;
  alternateValue: string;
  note: string;
};

type RateVariant = {
  variantName: string;
  drops: RateDrop[];
};

type RatesData = {
  variants: RateVariant[];
  consumedResources: RateDrop[];
  variabilityNote: string;
  additionalNotes: string;
};

export default function CreateDesignForm({
  isArchiver,
}: {
  isArchiver: boolean;
}) {
  const [designers, setDesigners] = useState([
    { name: "", url: "", contributions: "" },
  ]);
  const [credits, setCredits] = useState<
    Array<{ name: string; url: string; contributions: string }>
  >([]);
  const [formData, setFormData] = useState({
    title: "",
    categories: "",
    description: "",
  });
  const [versions, setVersions] = useState<VersionRange[]>([
    {
      startVersion: "",
      rangeType: "current",
      endVersion: "",
      modifier: "none",
      modifierDetails: "",
    },
  ]);
  const [rates, setRates] = useState<RatesData>({
    variants: [
      {
        variantName: "Default",
        drops: [
          {
            dropName: "",
            rateValue: "",
            rateUnit: "h",
            customUnit: "",
            condition: "",
            externalFactor: "",
            alternateInterval: "",
            alternateValue: "",
            note: "",
          },
        ],
      },
    ],
    consumedResources: [],
    variabilityNote: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const addDesigner = () => {
    setDesigners([...designers, { name: "", url: "", contributions: "" }]);
  };

  const removeDesigner = (index: number) => {
    if (designers.length > 1) {
      setDesigners(designers.filter((_, i) => i !== index));
      if (Array.isArray(errors.designers)) {
        const newErrors = [...errors.designers];
        newErrors.splice(index, 1);
        setErrors({ ...errors, designers: newErrors });
      }
    }
  };

  const updateDesigner = (
    index: number,
    field: "name" | "url" | "contributions",
    value: string
  ) => {
    const updated = [...designers];
    updated[index][field] = value;
    setDesigners(updated);

    if (Array.isArray(errors.designers) && errors.designers[index]?.[field]) {
      const newErrors = [...errors.designers];
      if (newErrors[index]) {
        delete newErrors[index][field];
        setErrors({ ...errors, designers: newErrors });
      }
    }
  };

  const addCredit = () => {
    setCredits([...credits, { name: "", url: "", contributions: "" }]);
  };

  const removeCredit = (index: number) => {
    setCredits(credits.filter((_, i) => i !== index));
    if (Array.isArray(errors.credits)) {
      const newErrors = [...errors.credits];
      newErrors.splice(index, 1);
      setErrors({ ...errors, credits: newErrors });
    }
  };

  const updateCredit = (
    index: number,
    field: "name" | "url" | "contributions",
    value: string
  ) => {
    const updated = [...credits];
    updated[index][field] = value;
    setCredits(updated);

    if (Array.isArray(errors.credits) && errors.credits[index]?.[field]) {
      const newErrors = [...errors.credits];
      if (newErrors[index]) {
        delete newErrors[index][field];
        setErrors({ ...errors, credits: newErrors });
      }
    }
  };

  const addVersionRange = () => {
    setVersions([
      ...versions,
      {
        startVersion: "",
        rangeType: "current",
        endVersion: "",
        modifier: "none",
        modifierDetails: "",
      },
    ]);
  };

  const removeVersionRange = (index: number) => {
    if (versions.length > 1) {
      setVersions(versions.filter((_, i) => i !== index));
      if (Array.isArray(errors.versions)) {
        const newErrors = [...errors.versions];
        newErrors.splice(index, 1);
        setErrors({ ...errors, versions: newErrors });
      }
    }
  };

  const updateVersionRange = (
    index: number,
    field: keyof VersionRange,
    value: string
  ) => {
    const updated = [...versions];
    (updated[index][field] as string) = value;
    setVersions(updated);

    if (Array.isArray(errors.versions) && errors.versions[index]) {
      const newErrors = [...errors.versions];
      if (newErrors[index] && field in newErrors[index]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (newErrors[index] as any)[field];
        setErrors({ ...errors, versions: newErrors });
      }
    }
  };

  // Rates management functions
  const addVariant = () => {
    setRates({
      ...rates,
      variants: [
        ...rates.variants,
        {
          variantName: "",
          drops: [
            {
              dropName: "",
              rateValue: "",
              rateUnit: "h",
              customUnit: "",
              condition: "",
              externalFactor: "",
              alternateInterval: "",
              alternateValue: "",
              note: "",
            },
          ],
        },
      ],
    });
  };

  const removeVariant = (variantIndex: number) => {
    if (rates.variants.length > 1) {
      setRates({
        ...rates,
        variants: rates.variants.filter((_, i) => i !== variantIndex),
      });
    }
  };

  const updateVariant = (
    variantIndex: number,
    field: keyof RateVariant,
    value: string | RateDrop[]
  ) => {
    const updated = { ...rates };
    (updated.variants[variantIndex][field] as typeof value) = value;
    setRates(updated);

    // Clear error for variant name
    if (
      field === "variantName" &&
      errors.rates?.variants &&
      Array.isArray(errors.rates.variants) &&
      errors.rates.variants[variantIndex]?.variantName
    ) {
      const newErrors = { ...errors };
      if (
        newErrors.rates?.variants &&
        Array.isArray(newErrors.rates.variants)
      ) {
        delete newErrors.rates.variants[variantIndex].variantName;
        setErrors(newErrors);
      }
    }
  };

  const addDrop = (variantIndex: number) => {
    const updated = { ...rates };
    updated.variants[variantIndex].drops.push({
      dropName: "",
      rateValue: "",
      rateUnit: "h",
      customUnit: "",
      condition: "",
      externalFactor: "",
      alternateInterval: "",
      alternateValue: "",
      note: "",
    });
    setRates(updated);
  };

  const removeDrop = (variantIndex: number, dropIndex: number) => {
    const updated = { ...rates };
    if (updated.variants[variantIndex].drops.length > 1) {
      updated.variants[variantIndex].drops = updated.variants[
        variantIndex
      ].drops.filter((_, i) => i !== dropIndex);
      setRates(updated);
    }
  };

  const updateDrop = (
    variantIndex: number,
    dropIndex: number,
    field: keyof RateDrop,
    value: string
  ) => {
    const updated = { ...rates };
    if (field === "rateUnit") {
      updated.variants[variantIndex].drops[dropIndex][field] = value as
        | "h"
        | "custom";
    } else {
      (updated.variants[variantIndex].drops[dropIndex][field] as string) =
        value;
    }
    setRates(updated);

    // Clear error for this field
    if (
      errors.rates?.variants &&
      Array.isArray(errors.rates.variants) &&
      errors.rates.variants[variantIndex]?.drops &&
      Array.isArray(errors.rates.variants[variantIndex].drops) &&
      errors.rates.variants[variantIndex].drops![dropIndex]?.[field]
    ) {
      const newErrors = { ...errors };
      if (
        newErrors.rates?.variants &&
        Array.isArray(newErrors.rates.variants) &&
        newErrors.rates.variants[variantIndex]?.drops &&
        Array.isArray(newErrors.rates.variants[variantIndex].drops)
      ) {
        delete newErrors.rates.variants[variantIndex].drops![dropIndex][field];
        setErrors(newErrors);
      }
    }
  };

  const addConsumedResource = () => {
    setRates({
      ...rates,
      consumedResources: [
        ...rates.consumedResources,
        {
          dropName: "",
          rateValue: "",
          rateUnit: "h",
          customUnit: "",
          condition: "",
          externalFactor: "",
          alternateInterval: "",
          alternateValue: "",
          note: "",
        },
      ],
    });
  };

  const removeConsumedResource = (index: number) => {
    setRates({
      ...rates,
      consumedResources: rates.consumedResources.filter((_, i) => i !== index),
    });
  };

  const updateConsumedResource = (
    index: number,
    field: keyof RateDrop,
    value: string
  ) => {
    const updated = { ...rates };
    if (field === "rateUnit") {
      updated.consumedResources[index][field] = value as "h" | "custom";
    } else {
      (updated.consumedResources[index][field] as string) = value;
    }
    setRates(updated);

    // Clear error for this field
    if (
      errors.rates?.consumedResources &&
      Array.isArray(errors.rates.consumedResources) &&
      errors.rates.consumedResources[index]?.[field]
    ) {
      const newErrors = { ...errors };
      if (
        newErrors.rates?.consumedResources &&
        Array.isArray(newErrors.rates.consumedResources)
      ) {
        delete newErrors.rates.consumedResources[index][field];
        setErrors(newErrors);
      }
    }
  };

  const formatRateValue = (value: string): string => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;

    const absNum = Math.abs(num);
    const digits = Math.floor(absNum).toString().length;

    if (digits <= 3) {
      return Math.floor(num).toString();
    } else if (digits >= 4 && digits <= 6) {
      return (num / 1000).toFixed(2).replace(/\.?0+$/, "") + "k";
    } else {
      return (num / 1000000).toFixed(2).replace(/\.?0+$/, "") + "M";
    }
  };

  const updateRatesField = (field: keyof RatesData, value: string) => {
    setRates({ ...rates, [field]: value });

    // Clear error for this field
    if (errors.rates?.[field]) {
      const newErrors = { ...errors };
      if (newErrors.rates) {
        delete newErrors.rates[field];
        setErrors(newErrors);
      }
    }
  };

  const generateRatePreview = (drop: RateDrop): string => {
    let preview = drop.dropName || "Drop";

    if (drop.condition) {
      preview += ` (${drop.condition})`;
    }

    preview += ": ";

    if (drop.rateValue) {
      preview += formatRateValue(drop.rateValue);
    } else {
      preview += "x";
    }

    if (drop.externalFactor) {
      preview += `/${drop.externalFactor}`;
    }

    preview += `/${
      drop.rateUnit === "h" ? "h" : drop.customUnit || "interval"
    }`;

    if (drop.note) {
      preview += ` (${drop.note})`;
    }

    return preview;
  };

  const generateVersionString = () => {
    return versions
      .map((v) => {
        let base = `1.${v.startVersion}`;
        if (v.rangeType === "current") {
          base += "+";
        } else if (v.rangeType === "until" && v.endVersion) {
          base += `-1.${v.endVersion}`;
        }

        if (v.modifier === "with-modifications") {
          base += " (with modifications)";
        } else if (v.modifier === "see-thread") {
          base += " (see thread)";
        }

        return base;
      })
      .join("; ");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = designersSchema.safeParse({
      ...formData,
      designers: designers.map((d) => ({
        name: d.name,
        url: d.url || "",
        contributions: d.contributions || "",
      })),
      credits: credits.length > 0 ? credits : undefined,
      versions: versions,
      rates: rates,
    });

    if (!result.success) {
      const newErrors: FormErrors = {};

      result.error.issues.forEach((err) => {
        const path = err.path;

        if (path[0] === "designers" && typeof path[1] === "number") {
          const index = path[1];
          const field = path[2] as "name" | "url" | "contributions";

          if (!Array.isArray(newErrors.designers)) {
            newErrors.designers = [];
          }
          if (!newErrors.designers[index]) {
            newErrors.designers[index] = {};
          }
          newErrors.designers[index][field] = err.message;
        } else if (path[0] === "designers" && path.length === 1) {
          newErrors.designers = err.message;
        } else if (path[0] === "credits" && typeof path[1] === "number") {
          const index = path[1];
          const field = path[2] as "name" | "contributions";

          if (!Array.isArray(newErrors.credits)) {
            newErrors.credits = [];
          }
          if (!newErrors.credits[index]) {
            newErrors.credits[index] = {};
          }
          newErrors.credits[index][field] = err.message;
        } else if (path[0] === "credits" && path.length === 1) {
          newErrors.credits = err.message;
        } else if (path[0] === "versions" && typeof path[1] === "number") {
          const index = path[1];
          const field = path[2] as keyof VersionError;

          if (!Array.isArray(newErrors.versions)) {
            newErrors.versions = [];
          }
          if (!newErrors.versions[index]) {
            newErrors.versions[index] = {};
          }
          newErrors.versions[index][field] = err.message;
        } else if (path[0] === "versions" && path.length === 1) {
          newErrors.versions = err.message;
        } else if (path[0] === "rates") {
          if (!newErrors.rates) {
            newErrors.rates = {};
          } else if (path[1] === "variabilityNote") {
            newErrors.rates.variabilityNote = err.message;
          } else if (path[1] === "additionalNotes") {
            newErrors.rates.additionalNotes = err.message;
          } else if (path[1] === "variants" && typeof path[2] === "number") {
            const variantIndex = path[2];
            if (!Array.isArray(newErrors.rates.variants)) {
              newErrors.rates.variants = [];
            }
            if (!newErrors.rates.variants[variantIndex]) {
              newErrors.rates.variants[variantIndex] = {};
            }

            if (path[3] === "variantName") {
              newErrors.rates.variants[variantIndex].variantName = err.message;
            } else if (path[3] === "drops" && typeof path[4] === "number") {
              const dropIndex = path[4];
              if (
                !Array.isArray(newErrors.rates.variants[variantIndex].drops)
              ) {
                newErrors.rates.variants[variantIndex].drops = [];
              }
              if (!newErrors.rates.variants[variantIndex].drops![dropIndex]) {
                newErrors.rates.variants[variantIndex].drops![dropIndex] = {};
              }

              const field = path[5] as keyof RateDropError;
              newErrors.rates.variants[variantIndex].drops![dropIndex][field] =
                err.message;
            } else if (path[3] === "drops" && path.length === 3) {
              newErrors.rates.variants[variantIndex].drops = err.message;
            }
          } else if (path[1] === "variants" && path.length === 1) {
            newErrors.rates.variants = err.message;
          } else if (
            path[1] === "consumedResources" &&
            typeof path[2] === "number"
          ) {
            const resourceIndex = path[2];
            if (!Array.isArray(newErrors.rates.consumedResources)) {
              newErrors.rates.consumedResources = [];
            }
            if (!newErrors.rates.consumedResources[resourceIndex]) {
              newErrors.rates.consumedResources[resourceIndex] = {};
            }

            const field = path[3] as keyof RateDropError;
            newErrors.rates.consumedResources[resourceIndex][field] =
              err.message;
          } else if (path[1] === "consumedResources" && path.length === 1) {
            newErrors.rates.consumedResources = err.message;
          }
        } else if (path.length === 1) {
          const key = path[0] as keyof FormErrors;
          newErrors[key] = err.message;
        }
      });

      setErrors(newErrors);
      return;
    }

    console.log("Validated data:", result.data);
    console.log("Generated version string:", generateVersionString());
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Share New Design</h1>
        <p className="text-muted-foreground">
          Upload and catalog a new design to the TMC collection
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Design Information</CardTitle>
              <CardDescription>
                Provide the basic details about this design
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Design Title</FieldLabel>
                  <Input
                    id="title"
                    placeholder="Enter design title..."
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.title}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="categories">Categories</FieldLabel>
                  <Input
                    id="categories"
                    placeholder="Pick categories from the dropdown.."
                    type="text"
                    value={formData.categories}
                    onChange={(e) =>
                      handleFieldChange("categories", e.target.value)
                    }
                  />
                  {errors.categories && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.categories}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <textarea
                    id="description"
                    placeholder="Describe this design..."
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.description}
                    onChange={(e) =>
                      handleFieldChange("description", e.target.value)
                    }
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.description}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Designers</CardTitle>
              <CardDescription>
                Add designers and their contributions. If not in the server,
                provide their YouTube or BiliBili URL.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {designers.map((designer, index) => (
                  <div
                    key={index}
                    className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-1 space-y-3">
                        <Field>
                          <FieldLabel htmlFor={`designer-name-${index}`}>
                            Designer Name
                          </FieldLabel>
                          <Input
                            id={`designer-name-${index}`}
                            placeholder="Designer name"
                            type="text"
                            value={designer.name}
                            onChange={(e) =>
                              updateDesigner(index, "name", e.target.value)
                            }
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Designer&apos;s discord name
                          </p>
                          {Array.isArray(errors.designers) &&
                            errors.designers[index]?.name && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.designers[index].name}
                              </p>
                            )}
                        </Field>

                        <Field>
                          <FieldLabel htmlFor={`designer-url-${index}`}>
                            URL (Optional - YouTube/BiliBili)
                          </FieldLabel>
                          <Input
                            id={`designer-url-${index}`}
                            placeholder="https://youtube.com/@username (remove ?si= metadata)"
                            type="text"
                            value={designer.url}
                            onChange={(e) =>
                              updateDesigner(index, "url", e.target.value)
                            }
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Remove trailing metadata (?si=)
                          </p>
                          {Array.isArray(errors.designers) &&
                            errors.designers[index]?.url && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.designers[index].url}
                              </p>
                            )}
                        </Field>

                        <Field>
                          <FieldLabel
                            htmlFor={`designer-contributions-${index}`}
                          >
                            Contributions (Optional)
                          </FieldLabel>
                          <Input
                            id={`designer-contributions-${index}`}
                            placeholder="e.g., Main design, Color scheme, Logo"
                            type="text"
                            value={designer.contributions}
                            onChange={(e) =>
                              updateDesigner(
                                index,
                                "contributions",
                                e.target.value
                              )
                            }
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Must start with uppercase, rest lowercase, no
                            periods. Separate with commas.
                          </p>
                          {Array.isArray(errors.designers) &&
                            errors.designers[index]?.contributions && (
                              <p className="text-sm text-destructive mt-1">
                                {errors.designers[index].contributions}
                              </p>
                            )}
                        </Field>
                      </div>

                      {designers.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeDesigner(index)}
                          className="mt-8"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {typeof errors.designers === "string" && (
                  <p className="text-sm text-destructive">{errors.designers}</p>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addDesigner}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Designer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credits</CardTitle>
              <CardDescription>
                Add secondary contributors with specific contributions. Same
                format as designers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {credits.length === 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addCredit}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Credit
                </Button>
              ) : (
                <div className="space-y-4">
                  {credits.map((credit, index) => (
                    <div
                      key={index}
                      className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0"
                    >
                      <div className="flex gap-3 items-start">
                        <div className="flex-1 space-y-3">
                          <Field>
                            <FieldLabel htmlFor={`credit-name-${index}`}>
                              Name
                            </FieldLabel>
                            <Input
                              id={`credit-name-${index}`}
                              placeholder="Individual or group name"
                              type="text"
                              value={credit.name}
                              onChange={(e) =>
                                updateCredit(index, "name", e.target.value)
                              }
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Discord name or group name
                            </p>
                            {Array.isArray(errors.credits) &&
                              errors.credits[index]?.name && (
                                <p className="text-sm text-destructive mt-1">
                                  {errors.credits[index].name}
                                </p>
                              )}
                          </Field>

                          <Field>
                            <FieldLabel htmlFor={`credit-url-${index}`}>
                              URL (Optional - YouTube/BiliBili)
                            </FieldLabel>
                            <Input
                              id={`credit-url-${index}`}
                              placeholder="https://youtube.com/@username (remove ?si= metadata)"
                              type="text"
                              value={credit.url}
                              onChange={(e) =>
                                updateCredit(index, "url", e.target.value)
                              }
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Remove trailing metadata (?si=)
                            </p>
                            {Array.isArray(errors.credits) &&
                              errors.credits[index]?.url && (
                                <p className="text-sm text-destructive mt-1">
                                  {errors.credits[index].url}
                                </p>
                              )}
                          </Field>

                          <Field>
                            <FieldLabel
                              htmlFor={`credit-contributions-${index}`}
                            >
                              Contributions
                            </FieldLabel>
                            <Input
                              id={`credit-contributions-${index}`}
                              placeholder="e.g., Testing, Feedback, Resources"
                              type="text"
                              value={credit.contributions}
                              onChange={(e) =>
                                updateCredit(
                                  index,
                                  "contributions",
                                  e.target.value
                                )
                              }
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Must start with uppercase, rest lowercase, no
                              periods. Separate with commas.
                            </p>
                            {Array.isArray(errors.credits) &&
                              errors.credits[index]?.contributions && (
                                <p className="text-sm text-destructive mt-1">
                                  {errors.credits[index].contributions}
                                </p>
                              )}
                          </Field>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeCredit(index)}
                          className="mt-8"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {typeof errors.credits === "string" && (
                    <p className="text-sm text-destructive">{errors.credits}</p>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCredit}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Credit
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Versions</CardTitle>
              <CardDescription>
                Specify Minecraft version compatibility ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {versions.map((version, index) => (
                  <div
                    key={index}
                    className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <Field>
                            <FieldLabel htmlFor={`version-start-${index}`}>
                              Start Version
                            </FieldLabel>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">1.</span>
                              <Input
                                id={`version-start-${index}`}
                                placeholder="19"
                                type="text"
                                value={version.startVersion}
                                onChange={(e) =>
                                  updateVersionRange(
                                    index,
                                    "startVersion",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            {Array.isArray(errors.versions) &&
                              errors.versions[index]?.startVersion && (
                                <p className="text-sm text-destructive mt-1">
                                  {errors.versions[index].startVersion}
                                </p>
                              )}
                          </Field>

                          <Field>
                            <FieldLabel htmlFor={`version-range-${index}`}>
                              Range Type
                            </FieldLabel>
                            <Select
                              value={version.rangeType}
                              onValueChange={(value) =>
                                updateVersionRange(index, "rangeType", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="+ (to current)" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="current">
                                  + (to current)
                                </SelectItem>
                                <SelectItem value="until">- (until)</SelectItem>
                                <SelectItem value="single">
                                  Single version
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </Field>

                          {version.rangeType === "until" && (
                            <Field>
                              <FieldLabel htmlFor={`version-end-${index}`}>
                                End Version
                              </FieldLabel>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">1.</span>
                                <Input
                                  id={`version-end-${index}`}
                                  placeholder="20"
                                  type="text"
                                  value={version.endVersion}
                                  onChange={(e) =>
                                    updateVersionRange(
                                      index,
                                      "endVersion",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              {Array.isArray(errors.versions) &&
                                errors.versions[index]?.endVersion && (
                                  <p className="text-sm text-destructive mt-1">
                                    {errors.versions[index].endVersion}
                                  </p>
                                )}
                            </Field>
                          )}
                          <Field>
                            <FieldLabel>Modifier</FieldLabel>
                            <Select
                              value={version.modifier}
                              onValueChange={(value) =>
                                updateVersionRange(index, "modifier", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="with-modifications">
                                  With modifications
                                </SelectItem>
                                <SelectItem value="see-thread">
                                  See thread
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </Field>
                        </div>

                        {Array.isArray(errors.versions) &&
                          errors.versions[index]?.modifierDetails && (
                            <p className="text-sm text-destructive mt-1">
                              {errors.versions[index].modifierDetails}
                            </p>
                          )}

                        {/* Preview */}
                        <div className="bg-muted/50 p-3 rounded-md">
                          <p className="text-xs text-muted-foreground mb-1">
                            Preview:
                          </p>
                          <code className="text-sm">
                            1.{version.startVersion}
                            {version.rangeType === "current" && "+"}
                            {version.rangeType === "until" &&
                              version.endVersion &&
                              `-1.${version.endVersion}`}
                            {version.modifier === "with-modifications" &&
                              " (with modifications)"}
                            {version.modifier === "see-thread" &&
                              " (see thread)"}
                          </code>
                        </div>
                      </div>

                      {versions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeVersionRange(index)}
                          className="mt-8"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {typeof errors.versions === "string" && (
                  <p className="text-sm text-destructive">{errors.versions}</p>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addVersionRange}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Version Range
                </Button>

                {/* Final combined preview */}
                {versions.length > 0 &&
                  versions.some((v) => v.startVersion) && (
                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-md">
                      <p className="text-sm font-medium mb-2">
                        Combined Version String:
                      </p>
                      <code className="text-sm break-all">
                        {generateVersionString()}
                      </code>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rates</CardTitle>
              <CardDescription>
                Specify production rates per hour. Format automatically adjusts
                based on value (≤3 digits: 101, 4-6 digits: 93.36k, ≥7 digits:
                2.81M)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Total Drops (Optional) */}

                {/* Variants */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">
                      Variants / Conditions
                    </h4>
                  </div>

                  {rates.variants.map((variant, variantIndex) => (
                    <div
                      key={variantIndex}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex gap-3 items-start">
                        <Field className="flex-1">
                          <FieldLabel htmlFor={`variant-name-${variantIndex}`}>
                            Variant Name
                          </FieldLabel>
                          <Input
                            id={`variant-name-${variantIndex}`}
                            placeholder="e.g., Default, Java 1.19+, With 10 bees"
                            type="text"
                            value={variant.variantName}
                            onChange={(e) =>
                              updateVariant(
                                variantIndex,
                                "variantName",
                                e.target.value
                              )
                            }
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Use &quot;Default&quot; for standard rates, version
                            format for version-specific (e.g., &quot;Java
                            1.19+&quot;), or condition (e.g., &quot;with 10
                            bees&quot;)
                          </p>
                          {Array.isArray(errors.rates?.variants) &&
                            errors.rates.variants[variantIndex]
                              ?.variantName && (
                              <p className="text-sm text-destructive mt-1">
                                {
                                  errors.rates.variants[variantIndex]
                                    .variantName
                                }
                              </p>
                            )}
                        </Field>

                        {rates.variants.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeVariant(variantIndex)}
                            className="mt-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      {/* Drops for this variant */}
                      <div className="space-y-3 ml-4 pl-4 border-l-2">
                        <h5 className="text-sm font-medium">Drops</h5>

                        {variant.drops.map((drop, dropIndex) => (
                          <div
                            key={dropIndex}
                            className="space-y-3 pb-3 border-b last:border-b-0 last:pb-0"
                          >
                            <div className="flex gap-3 items-start">
                              <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <Field>
                                    <FieldLabel
                                      htmlFor={`drop-name-${variantIndex}-${dropIndex}`}
                                    >
                                      Drop Name
                                    </FieldLabel>
                                    <Input
                                      id={`drop-name-${variantIndex}-${dropIndex}`}
                                      placeholder="e.g., Iron Ingot, Bone"
                                      type="text"
                                      value={drop.dropName}
                                      onChange={(e) =>
                                        updateDrop(
                                          variantIndex,
                                          dropIndex,
                                          "dropName",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Capitalize all words except articles
                                    </p>
                                    {Array.isArray(errors.rates?.variants) &&
                                      Array.isArray(
                                        errors.rates.variants[variantIndex]
                                          ?.drops
                                      ) &&
                                      errors.rates.variants[variantIndex]
                                        .drops![dropIndex]?.dropName && (
                                        <p className="text-sm text-destructive mt-1">
                                          {
                                            errors.rates.variants[variantIndex]
                                              .drops![dropIndex].dropName
                                          }
                                        </p>
                                      )}
                                  </Field>

                                  <Field>
                                    <FieldLabel
                                      htmlFor={`drop-rate-${variantIndex}-${dropIndex}`}
                                    >
                                      Rate Value
                                    </FieldLabel>
                                    <Input
                                      id={`drop-rate-${variantIndex}-${dropIndex}`}
                                      placeholder="e.g., 93360, 2810000"
                                      type="number"
                                      value={drop.rateValue}
                                      onChange={(e) =>
                                        updateDrop(
                                          variantIndex,
                                          dropIndex,
                                          "rateValue",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Enter raw number (auto-formats to k/M)
                                    </p>
                                    {Array.isArray(errors.rates?.variants) &&
                                      Array.isArray(
                                        errors.rates.variants[variantIndex]
                                          ?.drops
                                      ) &&
                                      errors.rates.variants[variantIndex]
                                        .drops![dropIndex]?.rateValue && (
                                        <p className="text-sm text-destructive mt-1">
                                          {
                                            errors.rates.variants[variantIndex]
                                              .drops![dropIndex].rateValue
                                          }
                                        </p>
                                      )}
                                  </Field>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <Field>
                                    <FieldLabel
                                      htmlFor={`drop-condition-${variantIndex}-${dropIndex}`}
                                    >
                                      Condition (Optional)
                                    </FieldLabel>
                                    <Input
                                      id={`drop-condition-${variantIndex}-${dropIndex}`}
                                      placeholder="e.g., with looting III"
                                      type="text"
                                      value={drop.condition}
                                      onChange={(e) =>
                                        updateDrop(
                                          variantIndex,
                                          dropIndex,
                                          "condition",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Must be lowercase (e.g., &quot;with 10
                                      bees&quot;)
                                    </p>
                                    {Array.isArray(errors.rates?.variants) &&
                                      Array.isArray(
                                        errors.rates.variants[variantIndex]
                                          ?.drops
                                      ) &&
                                      errors.rates.variants[variantIndex]
                                        .drops![dropIndex]?.condition && (
                                        <p className="text-sm text-destructive mt-1">
                                          {
                                            errors.rates.variants[variantIndex]
                                              .drops![dropIndex].condition
                                          }
                                        </p>
                                      )}
                                  </Field>

                                  <Field>
                                    <FieldLabel
                                      htmlFor={`drop-factor-${variantIndex}-${dropIndex}`}
                                    >
                                      External Factor (Optional)
                                    </FieldLabel>
                                    <Input
                                      id={`drop-factor-${variantIndex}-${dropIndex}`}
                                      placeholder="e.g., cat, chunk"
                                      type="text"
                                      value={drop.externalFactor}
                                      onChange={(e) =>
                                        updateDrop(
                                          variantIndex,
                                          dropIndex,
                                          "externalFactor",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      For rates like &quot;x/cat/h&quot; or
                                      &quot;x/chunk/h&quot;
                                    </p>
                                    {Array.isArray(errors.rates?.variants) &&
                                      Array.isArray(
                                        errors.rates.variants[variantIndex]
                                          ?.drops
                                      ) &&
                                      errors.rates.variants[variantIndex]
                                        .drops![dropIndex]?.externalFactor && (
                                        <p className="text-sm text-destructive mt-1">
                                          {
                                            errors.rates.variants[variantIndex]
                                              .drops![dropIndex].externalFactor
                                          }
                                        </p>
                                      )}
                                  </Field>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <Field>
                                    <FieldLabel
                                      htmlFor={`drop-unit-${variantIndex}-${dropIndex}`}
                                    >
                                      Time Unit
                                    </FieldLabel>
                                    <Select
                                      value={drop.rateUnit}
                                      onValueChange={(value) =>
                                        updateDrop(
                                          variantIndex,
                                          dropIndex,
                                          "rateUnit",
                                          value as "h" | "custom"
                                        )
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="h">
                                          per hour (h)
                                        </SelectItem>
                                        <SelectItem value="custom">
                                          Custom interval
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </Field>

                                  {drop.rateUnit === "custom" && (
                                    <Field className="col-span-2">
                                      <FieldLabel
                                        htmlFor={`drop-custom-unit-${variantIndex}-${dropIndex}`}
                                      >
                                        Custom Unit
                                      </FieldLabel>
                                      <Input
                                        id={`drop-custom-unit-${variantIndex}-${dropIndex}`}
                                        placeholder="e.g., min, day"
                                        type="text"
                                        value={drop.customUnit}
                                        onChange={(e) =>
                                          updateDrop(
                                            variantIndex,
                                            dropIndex,
                                            "customUnit",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Field>
                                  )}
                                </div>

                                {/* Alternate interval (for items measured differently) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <Field>
                                    <FieldLabel
                                      htmlFor={`drop-alt-value-${variantIndex}-${dropIndex}`}
                                    >
                                      Alt. Interval Value (Optional)
                                    </FieldLabel>
                                    <Input
                                      id={`drop-alt-value-${variantIndex}-${dropIndex}`}
                                      placeholder="e.g., 3 (for 3/min)"
                                      type="number"
                                      value={drop.alternateValue}
                                      onChange={(e) =>
                                        updateDrop(
                                          variantIndex,
                                          dropIndex,
                                          "alternateValue",
                                          e.target.value
                                        )
                                      }
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                      For commonly used alternate measurements
                                    </p>
                                    {Array.isArray(errors.rates?.variants) &&
                                      Array.isArray(
                                        errors.rates.variants[variantIndex]
                                          ?.drops
                                      ) &&
                                      errors.rates.variants[variantIndex]
                                        .drops![dropIndex]?.alternateValue && (
                                        <p className="text-sm text-destructive mt-1">
                                          {
                                            errors.rates.variants[variantIndex]
                                              .drops![dropIndex].alternateValue
                                          }
                                        </p>
                                      )}
                                  </Field>

                                  <Field>
                                    <FieldLabel
                                      htmlFor={`drop-alt-interval-${variantIndex}-${dropIndex}`}
                                    >
                                      Alt. Interval Unit
                                    </FieldLabel>
                                    <Input
                                      id={`drop-alt-interval-${variantIndex}-${dropIndex}`}
                                      placeholder="e.g., min, sec"
                                      type="text"
                                      value={drop.alternateInterval}
                                      onChange={(e) =>
                                        updateDrop(
                                          variantIndex,
                                          dropIndex,
                                          "alternateInterval",
                                          e.target.value
                                        )
                                      }
                                    />
                                    {Array.isArray(errors.rates?.variants) &&
                                      Array.isArray(
                                        errors.rates.variants[variantIndex]
                                          ?.drops
                                      ) &&
                                      errors.rates.variants[variantIndex]
                                        .drops![dropIndex]
                                        ?.alternateInterval && (
                                        <p className="text-sm text-destructive mt-1">
                                          {
                                            errors.rates.variants[variantIndex]
                                              .drops![dropIndex]
                                              .alternateInterval
                                          }
                                        </p>
                                      )}
                                  </Field>
                                </div>

                                <Field>
                                  <FieldLabel
                                    htmlFor={`drop-note-${variantIndex}-${dropIndex}`}
                                  >
                                    Note (Optional)
                                  </FieldLabel>
                                  <Input
                                    id={`drop-note-${variantIndex}-${dropIndex}`}
                                    placeholder="e.g., 85% efficiency, AFK-able"
                                    type="text"
                                    value={drop.note}
                                    onChange={(e) =>
                                      updateDrop(
                                        variantIndex,
                                        dropIndex,
                                        "note",
                                        e.target.value
                                      )
                                    }
                                  />
                                  {Array.isArray(errors.rates?.variants) &&
                                    Array.isArray(
                                      errors.rates.variants[variantIndex]?.drops
                                    ) &&
                                    errors.rates.variants[variantIndex].drops![
                                      dropIndex
                                    ]?.note && (
                                      <p className="text-sm text-destructive mt-1">
                                        {
                                          errors.rates.variants[variantIndex]
                                            .drops![dropIndex].note
                                        }
                                      </p>
                                    )}
                                </Field>

                                {/* Preview */}
                                <div className="bg-muted/50 p-3 rounded-md">
                                  <p className="text-xs text-muted-foreground mb-1">
                                    Preview:
                                  </p>
                                  <code className="text-sm">
                                    {generateRatePreview(drop)}
                                  </code>
                                  {drop.alternateValue &&
                                    drop.alternateInterval && (
                                      <div className="mt-2 ml-4">
                                        <code className="text-sm">
                                          - {drop.alternateValue}/
                                          {drop.alternateInterval}
                                        </code>
                                      </div>
                                    )}
                                </div>
                              </div>

                              {variant.drops.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    removeDrop(variantIndex, dropIndex)
                                  }
                                  className="mt-8"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addDrop(variantIndex)}
                          className="w-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Another Drop
                        </Button>
                      </div>

                      {/* Variant Preview */}
                      <div className="bg-primary/5 border border-primary/20 p-3 rounded-md">
                        <p className="text-xs font-medium mb-2">
                          Variant Preview:
                        </p>
                        <div className="space-y-1">
                          {variant.variantName && (
                            <p className="text-sm font-semibold">
                              {variant.variantName}:
                            </p>
                          )}
                          {variant.drops.map((drop, idx) => (
                            <p key={idx} className="text-sm ml-4">
                              - {generateRatePreview(drop)}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addVariant}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Variant/Condition
                  </Button>
                </div>

                {/* Variability Note */}
                <Field>
                  <FieldLabel htmlFor="variability-note">
                    Variability Note (Optional)
                  </FieldLabel>
                  <Input
                    id="variability-note"
                    placeholder="e.g., variable river biome shape"
                    type="text"
                    value={rates.variabilityNote}
                    onChange={(e) =>
                      updateRatesField("variabilityNote", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    If rates vary due to non-replicable conditions
                  </p>
                  {errors.rates?.variabilityNote && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.rates.variabilityNote}
                    </p>
                  )}
                </Field>
              </div>
            </CardContent>
          </Card>

          {/* Consumed Resources Card */}
          <Card>
            <CardHeader>
              <CardTitle>Consumes (Optional)</CardTitle>
              <CardDescription>
                Resources consumed by this design per hour
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rates.consumedResources.length === 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addConsumedResource}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Consumed Resource
                </Button>
              ) : (
                <div className="space-y-4">
                  {rates.consumedResources.map((resource, index) => (
                    <div
                      key={index}
                      className="space-y-3 pb-4 border-b last:border-b-0 last:pb-0"
                    >
                      <div className="flex gap-3 items-start">
                        <div className="flex-1 space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field>
                              <FieldLabel htmlFor={`consumed-name-${index}`}>
                                Resource Name
                              </FieldLabel>
                              <Input
                                id={`consumed-name-${index}`}
                                placeholder="e.g., Coal, Bone Meal"
                                type="text"
                                value={resource.dropName}
                                onChange={(e) =>
                                  updateConsumedResource(
                                    index,
                                    "dropName",
                                    e.target.value
                                  )
                                }
                              />
                              {Array.isArray(errors.rates?.consumedResources) &&
                                errors.rates.consumedResources[index]
                                  ?.dropName && (
                                  <p className="text-sm text-destructive mt-1">
                                    {
                                      errors.rates.consumedResources[index]
                                        .dropName
                                    }
                                  </p>
                                )}
                            </Field>

                            <Field>
                              <FieldLabel htmlFor={`consumed-rate-${index}`}>
                                Consumption Rate
                              </FieldLabel>
                              <Input
                                id={`consumed-rate-${index}`}
                                placeholder="e.g., 1200"
                                type="number"
                                value={resource.rateValue}
                                onChange={(e) =>
                                  updateConsumedResource(
                                    index,
                                    "rateValue",
                                    e.target.value
                                  )
                                }
                              />
                              {Array.isArray(errors.rates?.consumedResources) &&
                                errors.rates.consumedResources[index]
                                  ?.rateValue && (
                                  <p className="text-sm text-destructive mt-1">
                                    {
                                      errors.rates.consumedResources[index]
                                        .rateValue
                                    }
                                  </p>
                                )}
                            </Field>
                          </div>

                          {/* Preview */}
                          <div className="bg-muted/50 p-3 rounded-md">
                            <p className="text-xs text-muted-foreground mb-1">
                              Preview:
                            </p>
                            <code className="text-sm">
                              {generateRatePreview(resource)}
                            </code>
                          </div>
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeConsumedResource(index)}
                          className="mt-8"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addConsumedResource}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Consumed Resource
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Notes Card */}
          <Card>
            <CardHeader>
              <CardTitle>Notes (Optional)</CardTitle>
              <CardDescription>
                Additional notes about rates and production details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Field>
                <FieldLabel htmlFor="additional-notes">
                  Additional Notes
                </FieldLabel>
                <textarea
                  id="additional-notes"
                  placeholder="Any additional details about the rates, indirect production metrics (e.g., gold blocks/h), or other relevant information..."
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={rates.additionalNotes}
                  onChange={(e) =>
                    updateRatesField("additionalNotes", e.target.value)
                  }
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Use this for indirect metrics (e.g., gold blocks per hour for
                  gold farms) or other rate-related details
                </p>
                {errors.rates?.additionalNotes && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.rates.additionalNotes}
                  </p>
                )}
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>
                Add images and supporting documents for this design
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, SVG up to 10MB
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <ImageIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        preview.png
                      </p>
                      <p className="text-xs text-muted-foreground">2.4 MB</p>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">specs.pdf</p>
                      <p className="text-xs text-muted-foreground">1.1 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {isArchiver && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Archiver Access
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Create Design</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
