const samples = {
    items: {
        name: 'item', image: 'image',amount:'', category: 'category',
        seller: 'seller', description: 'description',
        status:'', doneOn: '23/01/2022',_id:''
    },
    categories: {
        name: 'category', _id: '', doneOn: '23/01/2022'
    },
    wishlist: {
        _id: '', item_id_:'', doneOn: '23/01/2022'
    },
    cart: {
        _id: '', item_id_:'', doneOn: '23/01/2022'
    },
    purchases:{
        _id: '', item_id_:'', doneOn: '23/01/2022' 
    },
    sold_items: {
        _id: '', item_id_:'', doneOn: '23/01/2022'
    },
    users:{
        _id: '', item_id_:'', doneOn: '23/01/2022'
    }
}
const the_categories = ['Home Appliances', 'Phones/Tablets', 'Computers/TVs', 'Other']
export const theappData = {
    items: 'nullData', categories: 'nullData', wishlist: 'nullData',
    cart: 'nullData', purchases: 'nullData', sold_items: 'nullData',
    users: 'nullData'
}

export const startComponents_ =()=>{
    Object.entries(samples).map(([key, values])=>{
        const the_items = []
        if(key === 'categories'){
            the_categories.map((category, index)=>{
                const item_ = {}
                item_['_id']= 'Cat' + index + 'TN'
                item_['name']= category
                item_['doneOn'] = index + '/' + '04' + '/' + '2023' 
                the_items.push(item_)
            })
        }else{
            for (let count=0; count<= 10; count++){
                const item_ = {}
                Object.entries(values).map(([theKey, value])=>{
                    let the_value__ 
                    if(key ==='items' && theKey === 'category'){
                        let the_index
                        if(count >= the_categories.length){
                            the_index = count - the_categories.length
                            if(the_index >= the_categories.length){
                                the_index = the_index - the_categories.length
                            }                       
                        }else{
                            the_index = count  
                        }
                        the_value__ = the_categories[the_index]
                    }else if(theKey==='image'){
                        the_value__ = 'http://toppng.com/04953' + count
                    }else if(theKey==='status'){
                        the_value__ = (count%2 ===0)?'Sold':''
                    }else if(theKey==='_id', theKey==='item_id_'){
                        the_value__ = 'LS' + ((count+12) *304) + 'fgm' +((count+9) *694)  + 'TN'
                    }else if(theKey === 'doneOn' || theKey === 'date'){
                        the_value__ = count + '/' + '04' + '/' + '2023' 
                    }else if(theKey === 'amount') {
                        const amount = (count*400) + (count*20) / (count*10)
                        the_value__ = amount > 500000 ? (amount / 10) : amount
                    }else if(theKey === 'description'){
                        the_value__ = value + ' for item ' + count
                    }else{
                        the_value__ = value + count
                    }
                    item_[theKey] = the_value__
                })
                the_items.push(item_)
            }
        }
        theappData[key] = the_items
    })
    return theappData
}