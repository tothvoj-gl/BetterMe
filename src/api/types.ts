import {Timestamp} from '@react-native-firebase/firestore';
import {z} from 'zod';

const AssetTypeSchema = z.object({
  id: z.string(),
  name_en: z.string(),
  name_sk: z.string(),
  question_en: z.string(),
  avgGrowthRate: z.number(),
  supportsRegularPayments: z.boolean(),
});

const TimestampType = z.custom<Timestamp>(value => value instanceof Timestamp);

export type AssetType = z.infer<typeof AssetTypeSchema>;

export interface Constants {
  inflationRate: number;
  lifeExpextancyFemales: number;
  lifeExpextancyMales: number;
}

const AssetSchema = z.object({
  id: z.string(),
  value: z.number(),
  keepInPension: z.boolean(),
  dateModified: TimestampType,
  monthlyPayment: z.number().optional(),
});

const LiabilitySchema = z.object({
  id: z.string(),
  value: z.number(),
  name: z.string(),
  annualRate: z.number(),
  dateModified: TimestampType,
  endDate: TimestampType,
});

export const UserSchema = z
  .object({
    sex: z.string(),
    currency: z.string(),
    birthDate: TimestampType,
    finance: z.object({
      assets: z.array(AssetSchema).optional(),
      liabilities: z.array(LiabilitySchema).optional(),
      monthlyNetIncome: z.number(),
      monthlyNetExpense: z.number(),
      incomeGrowthRate: z.number(),
    }),
  })
  .optional();

export type UserResponse = z.infer<typeof UserSchema>;
