import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  term: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scheduledRepayments: [
    {
      date: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["PENDING", "PAID", "PARTIALLY PAID"],
        default: "PENDING",
      },
    },
  ],
  status: {
    type: String,
    enum: ["PENDING", "APPROVED", "PAID", "REJECTED"],
    default: "PENDING",
  },
});

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
