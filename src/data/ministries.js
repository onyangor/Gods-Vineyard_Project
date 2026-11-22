import { Music, Users, Baby, HandHeart, Flame, Heart, Church, BookOpen } from "lucide-react";

// Edit descriptions and meeting times. Add new ministries by copying a block.
// Optional: add  image: "/images/ministry-youth.jpg"  (file in /public/images) to show a photo beside a ministry.
export const ministries = [
  { id: "worship", title: "Worship Ministry", icon: Music, summary: "Leading the church into the presence of God through music and song.", description: "Our worship team serves every gathering with prayer and excellence. [Add details about choir, band, rehearsals and how to join.]", meets: "Sundays, 10 – 11 (praise and worship)" },
  { id: "youth", title: "Youth Ministry", icon: Flame, summary: "Helping young people know Christ and grow in purpose.", description: "A place for teenagers and young adults to build faith, friendships and character. [Add details.]", meets: "[Meeting time]" },
  { id: "children", title: "Children's Ministry", icon: Baby, summary: "A safe, joyful place for children to learn about Jesus.", description: "Age-appropriate Bible teaching and activities for our youngest members. [Add details about age groups and safeguarding.]", meets: "Sundays, 11 – 1" },
  { id: "women", title: "Women's Fellowship", icon: Heart, summary: "Sisters encouraging one another in faith and life.", description: "Prayer, Bible study and support among the women of God's Vineyard. [Add details.]", meets: "[Meeting time]" },
  { id: "men", title: "Men's Fellowship", icon: Users, summary: "Men growing together as leaders in the home and community.", description: "Fellowship, accountability and service for the men of our church. [Add details.]", meets: "[Meeting time]" },
  { id: "outreach", title: "Community Outreach", icon: HandHeart, summary: "Serving Kisumu with the love of Christ.", description: "Reaching our neighbours through practical help and the gospel. [Add details of current outreach projects.]", meets: "[Meeting time]" },
  { id: "intercessory", title: "Intercessory Ministry", icon: Church, summary: "A dedicated time of prayer for the church and community.", description: "Our Sunday begins in prayer together. [Add details about the prayer team and how to join.]", meets: "Sundays, 8 – 9" },
  { id: "discipleship", title: "Discipleship Classes", icon: BookOpen, summary: "Learning and growing in the faith together.", description: "Classes that help believers grow in their walk with Christ. [Add details about topics and who can attend.]", meets: "Sundays, 9 – 10" },
];
