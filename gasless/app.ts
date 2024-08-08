import express from "express";
import {z} from "zod"
import { sendRawTransaction, } from "./wallet";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
const TransactionSchema = z.object({
   to: z.string(),
   data: z.string(),
   value: z.number(),
   chainId: z.union([z.literal(1116), z.literal(137)])
})

const ENV = z.object({
  KEY: z.string(),
  COREDAO_RPC:z.string(),
  POLYGON_RPC:z.string(),
  PORT:z.string().optional()
})
console.log("hiiii")
app.post("/transaction", async (req, res) => {
  const unparasedBody = req.body;
  console.log(unparasedBody)
  const env = ENV.parse(process.env)
  const parsedTransaction = TransactionSchema.parse(unparasedBody)

  const receipt = await sendRawTransaction({
    key: env.KEY as `0x${string}`,
    rpc: parsedTransaction.chainId === 1116 ? env.COREDAO_RPC : env.POLYGON_RPC,
    to: parsedTransaction.to as `0x${string}`,
    value: parsedTransaction.value.toString(),
    data: parsedTransaction.data as `0x${string}`,
    chainId: parsedTransaction.chainId
  })
  console.log({receipt},"recept")

  return res.status(200).json(receipt);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
