import React from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

import { fetchMessages, sendMessage } from '@/api/services';
import { Card, PrimaryButton, Screen, SectionTitle } from '@/components/ui';
import type { ChatMessage } from '@/types';

const peerId = 'factory-demo';

export default function ChatScreen() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [body, setBody] = React.useState('');

  React.useEffect(() => {
    fetchMessages(peerId).then(setMessages);
  }, []);

  const onSend = async () => {
    if (!body.trim()) return;
    const message = await sendMessage(peerId, body.trim());
    setMessages((prev) => [...prev, message]);
    setBody('');
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <SectionTitle title="Realtime chat" subtitle="Worker-factory communication powered by Socket.IO foundation." />
        <Card>
          <ScrollView style={{ maxHeight: 360 }}>
            <View className="gap-3">
              {messages.map((message, index) => (
                <View key={`${message.createdAt}-${index}`} className={`rounded-2xl p-3 ${message.from === 'me' ? 'self-end bg-safety-100' : 'bg-steel-100'}`}>
                  <Text className="text-sm text-slate-700">{message.body}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <TextInput
            className="mt-4 rounded-2xl border border-steel-200 bg-steel-50 px-4 py-3"
            placeholder="Type a message"
            value={body}
            onChangeText={setBody}
          />
          <View className="mt-4">
            <PrimaryButton label="Send" onPress={onSend} />
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}
