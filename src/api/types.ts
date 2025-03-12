import {Timestamp} from '@react-native-firebase/firestore';
import {z} from 'zod';

const AssetTypeSchema = z.object({
  name: z.string(),
  avgGrowthRate: z.number(),
});

const TimestampType = z.custom<Timestamp>(value => value instanceof Timestamp);

export type AssetType = z.infer<typeof AssetTypeSchema>;

export interface Constants {
  inflationRate: number;
  lifeExpextancyFemales: number;
  lifeExpextancyMales: number;
}

const AssetSchema = z.object({
  value: z.number(),
  keepInPension: z.boolean(),
  dateModified: TimestampType,
});

const LiabilitySchema = z.object({
  value: z.number(),
  name: z.string(),
  monthlyPayment: z.number(),
  dateModified: TimestampType,
  endDate: TimestampType,
});

export const UserSchema = z.object({
  sex: z.string(),
  currency: z.string(),
  birthDate: TimestampType,
  finance: z.object({
    assets: z.record(z.string(), AssetSchema),
    liabilities: z.record(z.string(), LiabilitySchema),
    monthlyNetIncome: z.number(),
    monthlyNetExpense: z.number(),
  }),
});

export type UserResponse = z.infer<typeof UserSchema>;
