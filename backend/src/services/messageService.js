// services/messageService.js
const MessageModel = require('../models/Message');

const MessageService = {
  async sendMessage({ sender_id, receiver_id, text, image }) {
    // ممكن تضيف تحقق هنا إذا كانت البيانات صالحة مثلاً
    return await MessageModel.createMessage({
      sender_id,
      receiver_id,
      text,
      image,
    });
  },

  async getConversation(senderId, receiverId) {
    // تحقق مثلاً أن senderId وreceiverId ليسا نفس الشخص
    if (senderId === receiverId) {
      throw new Error('You cannot chat with yourself');
    }

    return await MessageModel.getMessagesBetween(
      senderId,
      receiverId
    );
  },

  async getMessage(id) {
    const message = await MessageModel.getMessageById(id);
    if (!message) {
      throw new Error('Message doesnt exist!');
    }
    return message;
  },

  async deleteMessage(id) {
    const deletedCount = await MessageModel.deleteMessage(id);
    if (deletedCount === 0) {
      throw new Error('Delete failed: message doesnt exist');
    }
    return true;
  },
};

module.exports = MessageService;
