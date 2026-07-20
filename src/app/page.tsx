"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Avatar, Button, Card, Col, Divider, Row, Space, Tabs, Tag, Timeline, Typography, Progress, message } from "antd";

// Import Heroicons
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  BookOpenIcon, 
  AcademicCapIcon,
  SparklesIcon,
  CommandLineIcon
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const { Title, Text, Paragraph } = Typography;

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionsCount, setConnectionsCount] = useState(120);

  const handleConnectToggle = () => {
    if (isConnected) {
      setIsConnected(false);
      setConnectionsCount((prev) => prev - 1);
      message.info("Đã hủy kết nối thành viên");
    } else {
      setIsConnected(true);
      setConnectionsCount((prev) => prev + 1);
      message.success("Đã kết nối thành công!");
    }
  };

  const handleSendMessage = () => {
    message.success("Mở hộp thoại nhắn tin thành công!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
      {/* Profile Card Layout */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 mb-6">
        {/* Cover Photo */}
        <div className="relative h-60 w-full bg-gradient-to-r from-blue-900 to-blue-500">
          <Image
            className="w-full h-full object-cover"
            src="/profile_cover.png"
            alt="Cover Banner"
            fill
            priority
          />
        </div>

        {/* Profile Header Details */}
        <div className="relative px-6 md:px-8 pb-8 flex flex-col">
          <div className="relative -mt-20 inline-block w-36 h-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-50">
            <Image
              className="w-full h-full object-cover"
              src="/profile_avatar.png"
              alt="Avatar"
              width={150}
              height={150}
              priority
            />
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
            <div className="flex-1">
              <h1 className="m-0 mb-2 text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-1">
                Phạm Văn Dự
                <CheckBadgeIcon className="h-6 w-6 text-blue-500 inline-block align-middle ml-1" />
              </h1>
              <div className="text-sm md:text-base text-slate-600 mb-2 flex items-center">
                <span>Sinh viên ngành Công nghệ Thông tin tại Trường Đại học Sài Gòn (SGU)</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <Tag color="blue">Sinh viên CNTT</Tag>
                <Tag color="purple">Lập trình viên Web</Tag>
                <Tag color="cyan">Sài Gòn University</Tag>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-4 bg-slate-50 px-5 py-3 rounded-lg w-fit border border-slate-100">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-blue-900">8</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Dự án</span>
                </div>
                <Divider type="vertical" style={{ height: "auto", margin: "0" }} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-blue-900">{connectionsCount.toLocaleString("vi-VN")}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Kết nối</span>
                </div>
                <Divider type="vertical" style={{ height: "auto", margin: "0" }} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-blue-900">3.5★</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">GPA</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                type={isConnected ? "default" : "primary"}
                size="large"
                className="flex-1 md:flex-initial"
                style={{
                  minWidth: "130px",
                  borderRadius: "8px",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
                onClick={handleConnectToggle}
              >
                {isConnected ? "Đã kết nối" : "Kết nối"}
              </Button>
              <Button
                type="default"
                size="large"
                className="flex-1 md:flex-initial"
                style={{
                  minWidth: "130px",
                  borderRadius: "8px",
                  borderColor: "#1e3a8a",
                  color: "#1e3a8a",
                  fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
                onClick={handleSendMessage}
              >
                Nhắn tin
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <Row gutter={[24, 24]} className="mt-6">
        {/* Left Side: General Info & Badges */}
        <Col xs={24} md={8}>
          {/* About Card */}
          <Card className="rounded-xl shadow-sm border border-slate-100 mb-5 overflow-hidden" bordered={false}>
            <div className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-blue-900" />
              <span>Giới thiệu bản thân</span>
            </div>
            <Paragraph style={{ color: "#475569", fontSize: "14px", lineHeight: "1.6" }}>
              Chào mừng bạn đến với trang cá nhân EduSpace của tôi. Tôi hiện là sinh viên chuyên ngành Công nghệ Thông tin tại Trường Đại học Sài Gòn. Tôi có niềm đam mê lớn với lập trình Web (React, Next.js), xây dựng giao diện người dùng và giải quyết các bài toán thuật toán. Rất mong được kết nối và học hỏi từ mọi người!
            </Paragraph>
          </Card>

          {/* Contact Details Card */}
          <Card className="rounded-xl shadow-sm border border-slate-100 mb-5 overflow-hidden" bordered={false}>
            <div className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 text-blue-900" />
              <span>Thông tin liên hệ</span>
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center text-sm text-slate-700">
                <span className="text-blue-900 flex items-center justify-center w-7 h-7 bg-blue-50 rounded-md mr-3">
                  <EnvelopeIcon className="h-4 w-4" />
                </span>
                <span>{`phamvandu77tphcm@gmail.com`}</span>
              </div>
              <div className="flex items-center text-sm text-slate-700">
                <span className="text-blue-900 flex items-center justify-center w-7 h-7 bg-blue-50 rounded-md mr-3">
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span>{`0379614995`}</span>
              </div>
              <div className="flex items-center text-sm text-slate-700">
                <span className="text-blue-900 flex items-center justify-center w-7 h-7 bg-blue-50 rounded-md mr-3">
                  <MapPinIcon className="h-4 w-4" />
                </span>
                <span>Trường Đại học Sài Gòn, TP. Hồ Chí Minh</span>
              </div>
            </div>
          </Card>

          {/* Education Card */}
          <Card className="rounded-xl shadow-sm border border-slate-100 mb-5 overflow-hidden" bordered={false}>
            <div className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <AcademicCapIcon className="h-5 w-5 text-blue-900" />
              <span>Học vấn & Bằng cấp</span>
            </div>
            <Timeline
              style={{ marginTop: "12px" }}
              items={[
                {
                  children: (
                    <div>
                      <Text strong>Đại học Sài Gòn (SGU)</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: "12px" }}>Chuyên ngành Công nghệ Thông tin (2021 - 2025)</Text>
                    </div>
                  ),
                },
              ]}
            />
          </Card>

          {/* Skills / Interests Card */}
          <Card className="rounded-xl shadow-sm border border-slate-100 mb-5 overflow-hidden" bordered={false}>
            <div className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CommandLineIcon className="h-5 w-5 text-blue-900" />
              <span>Lĩnh vực chuyên môn</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">React & Next.js</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">HTML & CSS</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">TypeScript</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">Cấu trúc dữ liệu & Giải thuật</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">Tailwind CSS & Ant Design</span>
              <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium hover:bg-slate-200 transition-colors">RESTful APIs</span>
            </div>
          </Card>
        </Col>

        {/* Right Side: Tabs for Details (Overview, Courses, Activities) */}
        <Col xs={24} md={16}>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <Tabs
              defaultActiveKey="overview"
              items={[
                {
                  key: "overview",
                  label: "Tổng quan",
                  children: (
                    <div style={{ paddingTop: "12px" }}>
                      <Title level={4} style={{ color: "#0f172a", marginBottom: "16px" }}>
                        Kế hoạch học tập & Hoạt động
                      </Title>
                      
                      <div style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <Text strong>Tiến độ Đồ án môn học</Text>
                          <Text type="secondary">85%</Text>
                        </div>
                        <Progress percent={85} strokeColor="#1e3a8a" showInfo={false} />
                      </div>

                      <div style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <Text strong>Kỹ năng giải thuật (LeetCode)</Text>
                          <Text type="secondary">70%</Text>
                        </div>
                        <Progress percent={70} strokeColor="#10b981" showInfo={false} />
                      </div>

                      <div style={{ marginBottom: "24px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <Text strong>Ngoại ngữ (Tiếng Anh chuyên ngành)</Text>
                          <Text type="secondary">75%</Text>
                        </div>
                        <Progress percent={75} strokeColor="#f59e0b" showInfo={false} />
                      </div>

                      <Divider style={{ margin: "24px 0" }} />

                      <Title level={4} style={{ color: "#0f172a", marginBottom: "16px" }}>
                        Bài viết ghim
                      </Title>
                      <Card
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                        }}
                      >
                        <Title level={5} style={{ margin: "0 0 8px 0", color: "#1e3a8a" }}>
                          📚 Tổng hợp tài liệu tự học React và Next.js cho người mới bắt đầu (Năm học 2026)
                        </Title>
                        <Paragraph style={{ color: "#475569", marginBottom: "12px", fontSize: "14px" }}>
                          Chia sẻ bộ tài liệu và các dự án mini mình đã thực hiện trong quá trình tự học Front-end. Hy vọng sẽ giúp ích cho các bạn cùng khóa đang muốn theo hướng Web Developer với Next.js và Tailwind CSS.
                        </Paragraph>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Text type="secondary" style={{ fontSize: "12px" }}>Đăng ngày 20/07/2026</Text>
                          <Button type="link" style={{ padding: 0 }}>Đọc chi tiết →</Button>
                        </div>
                      </Card>
                    </div>
                  ),
                },
                {
                  key: "projects",
                  label: "Dự án cá nhân",
                  children: (
                    <div style={{ paddingTop: "12px" }}>
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-slate-100 rounded-xl bg-white" bordered={false} hoverable>
                            <Tag color="blue" style={{ marginBottom: "8px" }}>Đang thực hiện</Tag>
                            <Title level={5} style={{ margin: "0 0 8px 0" }}>
                              Hệ thống quản lý EduSpace (Front-end)
                            </Title>
                            <Paragraph style={{ color: "#64748b", fontSize: "13px", height: "40px", overflow: "hidden" }}>
                              Xây dựng giao diện học trực tuyến, kết nối giáo dục toàn diện bằng Next.js, Ant Design và Tailwind CSS.
                            </Paragraph>
                            <Divider style={{ margin: "12px 0" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
                                💻 Project cá nhân
                              </span>
                              <Button type="link" size="small">Xem Source</Button>
                            </div>
                          </Card>
                        </Col>
                        
                        <Col xs={24} sm={12}>
                          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-slate-100 rounded-xl bg-white" bordered={false} hoverable>
                            <Tag color="green" style={{ marginBottom: "8px" }}>Hoàn thành</Tag>
                            <Title level={5} style={{ margin: "0 0 8px 0" }}>
                              E-Commerce Website
                            </Title>
                            <Paragraph style={{ color: "#64748b", fontSize: "13px", height: "40px", overflow: "hidden" }}>
                              Trang web mua sắm trực tuyến tích hợp giỏ hàng và quản lý đơn hàng sử dụng React, Redux và Node.js.
                            </Paragraph>
                            <Divider style={{ margin: "12px 0" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
                                💻 Project môn học
                              </span>
                              <Button type="link" size="small">Xem chi tiết</Button>
                            </div>
                          </Card>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-slate-100 rounded-xl bg-white" bordered={false} hoverable>
                            <Tag color="green" style={{ marginBottom: "8px" }}>Hoàn thành</Tag>
                            <Title level={5} style={{ margin: "0 0 8px 0" }}>
                              Task Notes Application
                            </Title>
                            <Paragraph style={{ color: "#64748b", fontSize: "13px", height: "40px", overflow: "hidden" }}>
                              Ứng dụng ghi chú công việc hàng ngày, hỗ trợ lưu trữ dữ liệu local storage và bộ lọc tìm kiếm nhanh.
                            </Paragraph>
                            <Divider style={{ margin: "12px 0" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>
                                💻 Mini project
                              </span>
                              <Button type="link" size="small">Xem demo</Button>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  ),
                },
                {
                  key: "activities",
                  label: "Hoạt động gần đây",
                  children: (
                    <div style={{ paddingTop: "12px" }}>
                      <Timeline
                        style={{ marginTop: "16px" }}
                        items={[
                          {
                            color: "green",
                            children: (
                              <div className="pb-2">
                                <Text strong>Đã cập nhật giao diện trang chủ cá nhân trên EduSpace</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: "12px" }}>Thay đổi thông tin liên hệ và chuyển đổi sang pure Tailwind CSS (10 phút trước)</Text>
                              </div>
                            ),
                          },
                          {
                            color: "blue",
                            children: (
                              <div className="pb-2">
                                <Text strong>Hoàn thành bài tập lớn môn Lập trình Web</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: "12px" }}>Đại học Sài Gòn - Điểm đánh giá cao từ giảng viên hướng dẫn (Hôm qua)</Text>
                              </div>
                            ),
                          },
                          {
                            color: "gray",
                            children: (
                              <div className="pb-2">
                                <Text strong>Bắt đầu khóa học tự chọn Next.js Advanced</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: "12px" }}>Nâng cao kỹ thuật Server Component, Middleware và Streaming (3 ngày trước)</Text>
                              </div>
                            ),
                          },
                          {
                            color: "gray",
                            children: (
                              <div className="pb-2">
                                <Text strong>Tham gia hoạt động CLB Tin học tại Đại học Sài Gòn</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: "12px" }}>Sinh hoạt học thuật chuyên đề "Phát triển ứng dụng Web hiệu quả" (1 tuần trước)</Text>
                              </div>
                            ),
                          },
                        ]}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
