import React, {useState, useEffect} from 'react'
import LineChart from '../components/charts/userIncome';
import CardComponent from '../components/common/cardComponent'
import IncomeTable from '../components/tables/incomeTable';
import useTransactionStore from '../store/transactionStore';

import useIncomeStore from '../store/incomeStore';
import useExpenseStore from '../store/expenseStore';


function SetupBudget() {

  // for fetching all transactions on the table

  const { fetchTransactions } = useTransactionStore(); // Access state and actions from the store

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // GET TOTAL BALANCE AND REMAINING BALANCE

  const { getTotalIncomePerMonth } = useIncomeStore(); 
  const { totalIncome, getTotalIncome } = useIncomeStore();
  const { totalExpenses, getTotalExpenses } = useExpenseStore(); 

  useEffect(() => {

    getTotalIncome();
    getTotalExpenses();
    getTotalIncomePerMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const remainingBalance = (totalIncome - totalExpenses).toFixed(2);

  // ADD INCOME

  const addIncome = useIncomeStore((state) => state.addIncome); // Access the addExpense function from the store
  const [formData, setFormData] = useState({
  category: '',
  amount: '',
  fullName: '',

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addIncome(formData); // Call addExpense function with form data
      if (result.success) {
        // Handle success, e.g., show a success message
        console.log('Income added successfully:', result.data);
        setFormData({
          category: '',
          amount: '',
          fullName: '',
        });

        // call the functions for fetch transactions, total income, total expenses, total income per month

        await fetchTransactions();
        await getTotalIncome();
        await getTotalExpenses();
        await getTotalIncomePerMonth();

        
      } else {
        // Handle error, e.g., show an error message
        console.error('Failed to add expense:', result.error);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');






  return (
    <div className=' p-9 w-full flex flex-col gap-6'>

    <div className='flex items-center justify-between'>
                  <p className='text-2xl font-bold'>Income</p>
                  <button className='btn' onClick={()=>document.getElementById('my_modal_3').showModal()}>Add Income</button>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5'>


              <div className='flex flex-col gap-5'>

                  <div className='py-5 px-6 border border-base-300 rounded-xl'>
                        <CardComponent/>
                  </div>

                  <div className='py-5 px-6 border border-base-300 rounded-xl'>
                        <p className='mb-6 text-lg'>Main Balance</p>
                        <p className='text-5xl font-medium tracking-wide'>$ {remainingBalance}</p>

                  </div>

              </div>

              <div className='flex flex-col gap-5 col-span-1 lg:col-span-2'>
          
                  <div className='border rounded-xl  py-5 px-6 w-full' style={{ height: 400 }}>
                    <LineChart/>
                  </div>

                  <div className=' border border-base-300 rounded-xl py-5 px-6' >
                      <IncomeTable/>
                  </div>


              </div>


      </div>

      
    


      <dialog id="my_modal_3" className="modal">
                <div className="modal-box">

                  <form method="dialog">
                   
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  </form>

                  <h3 className="font-bold text-lg mb-6">Add Income</h3>

                
              
                    <form action="" className='flex flex-col gap-3' onSubmit={handleSubmit} >

                     

                      <input className='input input-bordered w-full' name='category' value={formData.category} onChange={handleChange} type="text" placeholder='Category' /> 

                      <input className='input input-bordered w-full' name='amount' value={formData.amount} onChange={handleChange} type="text" placeholder='Amount' /> 

                      <input className='input input-bordered w-full' name='fullName' value={formData.fullName} onChange={handleChange} type="text" placeholder='Full Name' /> 

                      <button className='btn' disabled={!isFormComplete}>Save</button>
                    
                
                    </form>


                </div>
      </dialog>

    
</div>
  )
}

export default SetupBudget
