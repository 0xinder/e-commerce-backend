const express= require('express');
const env =require('dotenv');
const mongoose =require('mongoose');
const path=require('path');
var cors=require('cors');

const app=express();

//routes
const authRoutes=require('./routes/auth');
const adminRoutes=require('./routes/admin/auth');
const categoryRoutes=require('./routes/category');
const productRoutes=require('./routes/product');
const cartRoutes=require('./routes/cart');
const initialDataRoutes=require('./routes/admin/initialData');
const pageRoutes=require('./routes/admin/page');

//environmentvariable
env.config();

//mongodbconnection
mongoose.connect('mongodb://localhost:27017/backend', {useNewUrlParser: true,useUnifiedTopology:true,useCreateIndex:true}).then(()=>{
    console.log('Database connected');
});

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname,'uploads')));

app.use('/api',authRoutes);
app.use('/api',categoryRoutes);
app.use('/api',adminRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',initialDataRoutes);
app.use('/api',pageRoutes);

app.listen(process.env.PORT,()=>{console.log(`server running on ${process.env.PORT}`);})