export default function errorsMiddleware(err,req,res,next){ //using err as first arg tells express this is an error middleware
    console.error('Error in errors middleware:\n', err.stack)
    res.status(500).send({success:false, message: err.message})
}