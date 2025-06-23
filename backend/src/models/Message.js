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
    return await db('messages')
      .where(function () {
        this.where({
          sender_id: senderId,
          receiver_id: receiverId,
        }).orWhere({
          sender_id: receiverId,
          receiver_id: senderId,
        });
      })
      .orderBy('created_at', 'asc');
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
