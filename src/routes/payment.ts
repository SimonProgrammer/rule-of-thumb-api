import { Router } from "express";
import { PaymentModel, IPayment } from "../models/payment";

const routes = Router();

routes.get("/", async (req, res) => {
  try {
    const { time = 'today', type = 'all' } = req.query;
    let dateFilter = {};
    if(time === 'today'){
        const start = new Date();
        start.setHours(0,0,0);
        const end = new Date();
        end.setDate(end.getDate() + 1);
        end.setHours(0,0,0);
        dateFilter = { datePayment: { '$gte': start, '$lt': end }};
    }
    else if(time === 'week'){
        const now = new Date().setHours(0, 0, 0, 0);
        const monday = new Date(now);
        monday.setDate(monday.getDate() - monday.getDay() + 1);
        const sunday = new Date(now);
        sunday.setDate(sunday.getDate() - sunday.getDay() + 7);

        dateFilter = { datePayment: { '$gte': monday, '$lt': sunday }};
    }
    else{
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        firstDay.setHours(0,0,0);
        lastDay.setHours(0,0,0);

        dateFilter = { datePayment: { '$gte': firstDay, '$lt': lastDay }};
    }

    const typeFilter = `${type}`.split(',');
    const dataFilter = typeFilter.includes('all') ? 
                    {...dateFilter } : 
                    { ...dateFilter, paymentType: { '$in': typeFilter }};
    
    const payments: IPayment[] = await PaymentModel.find(dataFilter).exec();
    return res.json(payments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Sorry, something went wrong :/" });
  }
});

export default routes;
