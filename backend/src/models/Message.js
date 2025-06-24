// models/messageModel.js
const { db } = require('../../config/db');

const Message = {
  // إنشاء رسالة جديدة
  createMessage: async ({ sender_id, receiver_id, text, image }) => {
    const [message] = await db('messages')
      .insert({ sender_id, receiver_id, text, image })
      .returning('*');
    return message;
  },

  // جلب الرسائل بين مرسل ومستقبل
  getMessagesBetween: async (senderId, receiverId) => {
    if (!senderId || !receiverId) {
      throw new Error('senderId or receiverId is missing');
    }
    return await db('messages')
      .where(function () {
        this.where('sender_id', senderId).andWhere(
          'receiver_id',
          receiverId
        );
      })
      .orWhere(function () {
        this.where('sender_id', receiverId).andWhere(
          'receiver_id',
          senderId
        );
      });
  },
  // جلب رسالة واحدة
  getMessageById: async (id) => {
    return await db('messages').where({ id }).first();
  },

  // حذف رسالة
  deleteMessage: async (id) => {
    return await db('messages').where({ id }).del();
  },
};

module.exports = Message;
