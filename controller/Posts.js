var _ = require('lodash');
const Post = require('../model/posts').Posts;
const Form = require('../config/Form');
const File = require('../config/File');
var ObjectId = require('objectid');


module.exports.addPost = async (req, res) => {
    try {
        //posts with same name can not be entered
        if (_.isEmpty(req.body.postName))
            return res.status(422).json({ "success": false, "msg": "Post name is required parameter." });
        if (_.isEmpty(req.body.description))
            return res.status(422).json({ "success": false, "msg": "Post description is required parameter." });
        if (req.body.postName.length > 256)
            return res.status(422).json({ "success": false, "msg": "Post name Should be of max length 256" });
        let postDetails = await Post.find({ "postName": req.body.postName })
        if (_.isEmpty(postDetails)) {
            //create new post
            let postCreateResult = await Post.create(req.body);
            if (_.isEmpty(postCreateResult)) {
                return res.status(422).json({
                    msg: "Something went worong while creating the post.",
                    success: false,
                    data: {}
                });
            } else {
                return res.status(200).json({
                    msg: "Post successfully created.",
                    success: true,
                    data: postCreateResult
                });
            }

        } else {
            return res.status(422).json({
                msg: "Post already exist with the same name . Please change post name.",
                success: false,
                data: {}
            });
        }
    } catch (error) {
        console.error('error-', error)
        res.status(500).json({ "success": false, "msg": "Server Error" });
    }
}

module.exports.listPosts = async (req, res) => {
    try {
        let data = req.query
        let pages = 'page' in req.query ? Number(req.query.page) : 1
        let pageSizes = 'pageSize' in req.query ? Number(req.query.pageSize) : 10
        let limit = Number(pageSizes);
        let skip = (Number(pages) - 1) * limit;

        let postDetails = await Post.aggregate([
            {
                $match: {}
            },
            {
                $project: {
                    "__v": 0
                }
            },
            {
                $facet: {
                    pageAndPageSize: [
                        {
                            $count: "total"
                        },
                        {
                            $addFields: {
                                page: Number(pages)
                            }
                        },
                        {
                            $addFields: {
                                perPage: Number(pageSizes)
                            }
                        }
                    ],
                    fetchedData: [
                        {
                            $skip: skip
                        },
                        {
                            $limit: limit
                        }
                    ]
                }
            }

        ]);
        return res.status(200).json({
            success: true,
            msg: "Post list Successfully fetched",
            data: postDetails
        });

    } catch (error) {
        console.error('error-', error);
        res.status(500).json({ "success": false, "msg": "Server Error" });
    }
}
module.exports.postUpdate = async (req, res) => {
    try {
        if (!req.body.postName || !req.body.description) {
            return res.status(422).json({
                success: false,
                msg: "Nothing to update in post.",
                data: {}
            });
        } else {
            if (req.body.postName) {
                let postDetails = await Post.findOne({ "postName": req.body.postName });
                if (_.isEmpty(postDetails)) {
                    return res.status(422).json({
                        success: true,
                        msg: "No data found with the post name.",
                        data: {}
                    });
                } else {
                    //update the post
                    let postUpdateObj = await Post.findOneAndUpdate({ "postName": req.body.postName }, { $set: req.body }, { new: true });
                    if (_.isEmpty(postUpdateObj)) {
                        return res.status(422).json({
                            success: true,
                            msg: "Something went wrong while updating post.",
                            data: {}
                        });
                    } else {
                        return res.status(422).json({
                            success: true,
                            msg: "Post data updated successfully.",
                            data: postUpdateObj
                        });
                    }
                }
            }
        }
    } catch (error) {
        console.error('error-', error);
        res.status(500).json({ "success": false, "msg": "Server Error" });
    }
}
module.exports.postDelete = async (req, res) => {
    try {
        let categoryDetails = await Post.findOneAndRemove({ "_id": req.body.id });
        if (_.isEmpty(categoryDetails)) {
            return res.status(422).json({
                "status": false,
                "data": "Posts not found.",
            });
        } else {
            return res.status(200).json({
                success: true,
                msg: "Posts succesfully deleted",
                data: {}
            });
        }

    } catch (error) {
        console.error('error-', error);
        res.status(500).json({ "success": false, "msg": "Server Error" });
    }
}