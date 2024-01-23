
import multer, { diskStorage } from 'multer'


export const upload = multer({
    storage:diskStorage({
        destination:function(req, file, cb)
        {
            cb(null, 'public/upload');
        },
        filename:function(req, file, cb)
        {
            cb(null, req.body.name);
        }
    })
});
