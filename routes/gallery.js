const express = require('express');
const Gallery = require('../db/models/gallery');
const router = express.Router();

router.route(`/`)
.get((req,res)=>{
  return Gallery
  .fetchAll()
  .then(result=>{
   return result.models.map((elem) =>{
    
    let {author,link,description} = elem.attributes
     
    return {author,link,description}
    })
  })
    .then(result=>{
  return res.render('gallery/index',{pic:result})
    
  })
  .catch(err=>{
    return res.json({message:err.message})
  })
})
.post((req,res)=>{
  let {author,link,description} = req.body;
  return new Gallery ({author,link,description})
  .save()
  .then(post =>{
    res.redirect('/gallery')
  })
  .catch(err=>{
    return res.json({message:err.message})
  })
});

router.route('/new')
.get((req,res)=>{
res.render('gallery/new');
})

router.route('/:id')
.get((req,res)=>{
  return new Gallery()
  .where({id:req.params.id})
  .fetch()
  .then(result=>{
    if(!result){
      throw new Error('Image not found')
    }
    return result.attributes
  })
  .then(result=>{
    return res.render('gallery/image',result);
  })
  .catch(err=>{
     return res.json({message: err.message})
  })
})
.put((req,res)=>{
  console.log('something')
 Gallery.forge({id:req.params.id})
 .fetch({require:true}) 
 .then(result=>{
   result.save({
     author:req.body.author,
     link:req.body.link,
     description:req.body.description
   })
 })
 .then(result=>{
   
   return res.redirect(`/gallery/${req.params.id}`);
 })
 .catch(err=>{
   return res.json({message:err.massage})
 })
})

.delete((req,res)=>{
  Gallery.forge({id:req.params.id})
  .fetch({require:true})
  .then(result=>{
    result.destroy()
    .then(result=>{
      return res.redirect('/gallery')
    })
    .catch(err=>{
      return res.json({message:err.message})
    })
  })
})

router.route('/:id/edit')
.get((req,res)=>{
  return new Gallery()
  .where({id:req.params.id})
  .fetch()
  .then(result=>{
    return result.attributes
  })
  .then(result=>{
    console.log(result)
    res.render('gallery/edit',result)
  })
  .catch(err=>{
    return res.json({message:err.message})
  })
})





module.exports = router;