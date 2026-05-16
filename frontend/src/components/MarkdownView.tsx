/**
 * Minimal Markdown renderer for the blog using React Native primitives.
 * Supports: # to ###### headings, **bold**, *italic*, `code`, lists (-, *, 1.), paragraphs, blockquotes, hr.
 * Designed for clean corporate reading without external deps.
 */
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors } from '../theme/tokens';

function renderInline(line: string, keyPrefix: string): React.ReactNode[] {
  // Tokenise inline: **bold**, *italic*, `code`
  const tokens: { type: 'text' | 'bold' | 'italic' | 'code'; value: string }[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) tokens.push({ type: 'text', value: line.slice(lastIndex, match.index) });
    const piece = match[0];
    if (piece.startsWith('**')) tokens.push({ type: 'bold', value: piece.slice(2, -2) });
    else if (piece.startsWith('`')) tokens.push({ type: 'code', value: piece.slice(1, -1) });
    else tokens.push({ type: 'italic', value: piece.slice(1, -1) });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < line.length) tokens.push({ type: 'text', value: line.slice(lastIndex) });

  return tokens.map((t, i) => {
    const k = `${keyPrefix}-${i}`;
    if (t.type === 'bold') return <Text key={k} style={styles.bold}>{t.value}</Text>;
    if (t.type === 'italic') return <Text key={k} style={styles.italic}>{t.value}</Text>;
    if (t.type === 'code') return <Text key={k} style={styles.code}>{t.value}</Text>;
    return <Text key={k}>{t.value}</Text>;
  });
}

export default function MarkdownView({ source }: { source: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = source.replace(/\r\n/g, '\n').split('\n');

  let i = 0;
  let para: string[] = [];
  const flushPara = () => {
    if (para.length) {
      const text = para.join(' ').trim();
      if (text) blocks.push(
        <Text key={`p-${blocks.length}`} style={styles.p}>{renderInline(text, `p${blocks.length}`)}</Text>
      );
      para = [];
    }
  };

  while (i < lines.length) {
    const raw = lines[i];
    const line = raw.replace(/\s+$/g, '');

    if (!line.trim()) { flushPara(); i++; continue; }

    // Heading
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      flushPara();
      const level = h[1].length;
      const headingStyle =
        level === 1 ? styles.h1
        : level === 2 ? styles.h2
        : level === 3 ? styles.h3
        : level === 4 ? styles.h4
        : styles.h5;
      blocks.push(
        <Text key={`h-${blocks.length}`} style={headingStyle}>{renderInline(h[2], `h${blocks.length}`)}</Text>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      flushPara();
      blocks.push(<View key={`hr-${blocks.length}`} style={styles.hr} />);
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s+/.test(line)) {
      flushPara();
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s+/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s+/, ''));
        i++;
      }
      blocks.push(
        <View key={`q-${blocks.length}`} style={styles.quote}>
          <Text style={styles.quoteText}>{renderInline(quoteLines.join(' '), `q${blocks.length}`)}</Text>
        </View>
      );
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <View key={`ul-${blocks.length}`} style={styles.list}>
          {items.map((it, idx) => (
            <View key={idx} style={styles.li}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.liText}>{renderInline(it, `li${idx}`)}</Text>
            </View>
          ))}
        </View>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <View key={`ol-${blocks.length}`} style={styles.list}>
          {items.map((it, idx) => (
            <View key={idx} style={styles.li}>
              <Text style={styles.bulletNum}>{idx + 1}.</Text>
              <Text style={styles.liText}>{renderInline(it, `oli${idx}`)}</Text>
            </View>
          ))}
        </View>
      );
      continue;
    }

    // Paragraph accumulation
    para.push(line);
    i++;
  }
  flushPara();

  return <View>{blocks}</View>;
}

const body = Platform.select({ web: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif' as any } as any, default: {} }) as any;

const styles = StyleSheet.create({
  p: { color: colors.text, fontSize: 17, lineHeight: 30, marginBottom: 18, ...body },
  h1: { color: colors.text, fontSize: 36, fontWeight: '900', marginTop: 32, marginBottom: 16, letterSpacing: -0.5, ...body },
  h2: { color: colors.text, fontSize: 28, fontWeight: '800', marginTop: 36, marginBottom: 12, letterSpacing: -0.3, ...body },
  h3: { color: colors.text, fontSize: 22, fontWeight: '700', marginTop: 28, marginBottom: 10, ...body },
  h4: { color: colors.text, fontSize: 19, fontWeight: '700', marginTop: 24, marginBottom: 8, ...body },
  h5: { color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 20, marginBottom: 8, ...body },
  bold: { fontWeight: '800', color: colors.text },
  italic: { fontStyle: 'italic' },
  code: { fontFamily: Platform.select({ web: 'JetBrains Mono, monospace' as any, default: 'monospace' }) as any, backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, color: '#A5B4FC' },
  hr: { height: 1, backgroundColor: colors.border, marginVertical: 24 },
  quote: { borderLeftWidth: 3, borderLeftColor: colors.cyan, paddingLeft: 16, marginVertical: 16, paddingVertical: 4 },
  quoteText: { color: colors.textMuted, fontSize: 17, lineHeight: 28, fontStyle: 'italic', ...body },
  list: { marginBottom: 18, gap: 8 },
  li: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  bullet: { color: colors.cyan, fontSize: 18, lineHeight: 28, width: 18 },
  bulletNum: { color: colors.cyan, fontSize: 15, lineHeight: 28, width: 22, fontWeight: '700' },
  liText: { flex: 1, color: colors.text, fontSize: 17, lineHeight: 28, ...body },
});
