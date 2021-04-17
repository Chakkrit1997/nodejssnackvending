//const fs = require('fs');

module.exports = {
    editProducts: (req, res) => {
        // var amount;
        // var ref = database.ref("nowsnack/s0").on('value',function(snapshot){
        //     amount = snapshot.val().amount;
        // });

        var snackobj = database.ref("nowsnack").once('value').then(function (dataSnapshot) {
            obj = dataSnapshot.val();
            //console.log(obj)
            res.render('pages/edit-snack.ejs', {
                title: "Welcome to snack vending",
                value: obj,
            });

        })

        // res.render('pages/edit-snack.ejs', {
        //     title: "Welcome to snack vending"
        // });
    },
    editSnack: (req, res) => {

        let snackid = req.body.ID;
        let snackname = req.body.fname;
        let price = req.body.price;
        let amount = req.body.amount;
        //console.log(req.body);
        //update to firebase
        var str = String("nowsnack/s" + snackid);
        var up = database.ref(str);
        //console.log(up);
        up.update({ name: snackname, price: price, amount: amount }).then(function () {
            console.log("update Success!");
            res.status(200).redirect("/edit");
        }).catch(function (error) {
            console.log("Update error : " + error.message);

        })
    },
    editPhoto: (req, res) => {
        if (req.files) {
            //console.log(req.files.image);
            let snack_name = req.body.snackname;
            let snack_id = req.body.id;

            let upload_file = req.files.image;
            let img_name = upload_file.name;
            let fileExtension = upload_file.mimetype.split("/")[1];
            console.log(fileExtension);
            img_name = "0" + snack_id + '.' + fileExtension;
            console.log(img_name);
            if (upload_file.mimetype === 'image/jpeg' || upload_file.mimetype === 'image/png' || upload_file.mimetype === 'image/gif') {
                console.log("pass");
                upload_file.mv(`public/assets/img/snack/${img_name}`, (err) => {
                    if (err){
                        return res.status(500).send(err);
                    }

                    

                });
            } else {
                console.log("NOOOOO");
            }

            res.redirect("/edit");
        }
        else {
            console.log("Not file fond");
            return res.status(400).send('Nofile were upload!');
        }
    }

}