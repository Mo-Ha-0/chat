const MessageService = require('../services/messageService');
const cloudinary = require('cloudinary').v2;

module.exports = {
  async getMessages(req, res) {
    try {
      const userToChatId = req.params.id;
      const myId = req.user.id;

      console.log(userToChatId);
      const messages = await MessageService.getConversation(
        myId,
        userToChatId
      );
      res.status(200).json(messages);
    } catch (error) {
      console.error(
        'Error in getMessages controller:',
        error.message
      );
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async sendMessage(req, res) {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user.id;

      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(
          image
        );
        imageUrl = uploadResponse.secure_url;
      }
      const newMessage = await MessageService.sendMessage({
        sender_id: senderId,
        receiver_id: receiverId,
        text,
        image: imageUrl,
      });

      //   TODO: real time functionality => sockcet.io

      res.status(201).json(newMessage);
    } catch (error) {
      console.error(
        'Error in sendMessage controller:',
        error.message
      );
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
