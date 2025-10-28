import { INTEREST_AREAS } from '@/const/application/business-in-saudi'
import { BusinessInSaudiFormData } from '@/type/application/business-in-saudi'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'

type BusinessInSaudiEmailProps = {
  formData: BusinessInSaudiFormData
  selectedInterestAreas: string[] // 관심분야 labels
  selectedSubItems: string[] // 세부항목 labels
}

export const BusinessInSaudiEmail = ({
  formData,
  selectedInterestAreas,
  selectedSubItems,
}: BusinessInSaudiEmailProps) => {
  const { companyInfo, additional } = formData

  return (
    <Html lang="ko">
      <Head />
      <Preview>Business in Saudi 신청서가 접수되었습니다.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
              <tr>
                <td width="100" valign="middle">
                  <Img
                    src={`${process.env.CLIENT_URL}/images/logo_g.png`}
                    width="100"
                    height="100"
                    alt="Logo"
                    style={logo}
                  />
                </td>
                <td valign="middle" style={{ paddingLeft: '32px' }}>
                  <Heading style={h1}>Business in Saudi 신청서</Heading>
                  <Text style={headerText}>새로운 신청이 접수되었습니다.</Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* 기업 정보 */}
          <Section style={section}>
            <Heading style={h2}>기업 정보</Heading>

            <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
              <tr>
                <td width="30%" style={labelCell}>
                  <Text style={label}>기업명</Text>
                </td>
                <td width="70%" style={valueCell}>
                  <Text style={value}>{companyInfo.companyName}</Text>
                </td>
              </tr>
              <tr>
                <td width="30%" style={labelCell}>
                  <Text style={label}>담당자명</Text>
                </td>
                <td width="70%" style={valueCell}>
                  <Text style={value}>{companyInfo.managerName}</Text>
                </td>
              </tr>
              <tr>
                <td width="30%" style={labelCell}>
                  <Text style={label}>담당자 이메일</Text>
                </td>
                <td width="70%" style={valueCell}>
                  <Text style={value}>{companyInfo.managerEmail}</Text>
                </td>
              </tr>
              <tr>
                <td width="30%" style={labelCell}>
                  <Text style={label}>설립연도</Text>
                </td>
                <td width="70%" style={valueCell}>
                  <Text style={value}>{companyInfo.foundingYear}</Text>
                </td>
              </tr>
              {companyInfo.documentUploads &&
                companyInfo.documentUploads.length > 0 && (
                  <tr>
                    <td width="30%" style={labelCell}>
                      <Text style={label}>첨부 문서</Text>
                    </td>
                    <td width="70%" style={valueCell}>
                      <Text style={value}>
                        {companyInfo.documentUploads.length}개의 파일이
                        첨부되었습니다.
                      </Text>
                    </td>
                  </tr>
                )}
            </table>
          </Section>

          {/* 관심 분야 및 필요 지원 */}
          <Section style={section}>
            <Heading style={h2}>관심 분야 및 필요 지원</Heading>

            {selectedInterestAreas.map((area, areaIndex) => {
              // 해당 관심분야의 세부항목만 필터링
              const areaId = formData.interestArea.areas[areaIndex]
              const areaSubItems = selectedSubItems.filter((_, subIndex) => {
                const subItemId = formData.interestArea.subitems[subIndex]
                // 현재 관심분야에 속한 세부항목인지 확인
                const belongsToArea = Object.values(INTEREST_AREAS).some(
                  (ia) =>
                    ia.id === areaId &&
                    ia.subItems.some((si) => si.id === subItemId),
                )
                return belongsToArea
              })

              return (
                <div key={areaIndex} style={areaBlock}>
                  <Text style={areaTitle}>{area}</Text>
                  {areaSubItems.length > 0 && (
                    <ul style={list}>
                      {areaSubItems.map((item, itemIndex) => (
                        <li key={itemIndex} style={listItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </Section>

          {/* 추가 정보 */}
          {additional && (
            <Section style={section}>
              <Heading style={h2}>추가 정보</Heading>

              <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                <tr>
                  <td width="30%" style={labelCell}>
                    <Text style={label}>사우디 진출 예상 시기</Text>
                  </td>
                  <td width="70%" style={valueCell}>
                    <Text style={value}>{additional.expectTimeline}</Text>
                  </td>
                </tr>
                <tr>
                  <td width="30%" style={labelCell}>
                    <Text style={label}>현재 투자 단계</Text>
                  </td>
                  <td width="70%" style={valueCell}>
                    <Text style={value}>{additional.curFundStage}</Text>
                  </td>
                </tr>
              </table>
            </Section>
          )}

          {/* 기타 문의 */}
          {additional?.comment && (
            <Section style={section}>
              <Heading style={h2}>기타 문의</Heading>
              <Text style={commentText}>{additional.comment}</Text>
            </Section>
          )}

          {/* Footer */}
          <Section style={footer}>
            <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
              <tr>
                <td align="center">
                  <Img
                    src={`${process.env.CLIENT_URL}/images/logo_g.png`}
                    width="50"
                    height="50"
                    alt="Logo"
                    style={footerLogo}
                  />
                </td>
              </tr>
              <tr>
                <td align="center">
                  <Text style={footerText}>
                    본 메일은 Business in Saudi 신청 시스템에서 발송되었습니다.
                  </Text>
                </td>
              </tr>
            </table>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default BusinessInSaudiEmail

// Styles
const main = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  lineHeight: '1.6',
  color: '#0a0b0d',
  backgroundColor: '#f5f5f5',
  padding: '16px',
}

const container = {
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  width: '100%',
}

const header = {
  backgroundColor: '#2d3364',
  borderRadius: '8px 8px 0 0',
  padding: '30px',
  marginBottom: '0',
}

const logo = {
  display: 'block',
}

const h1 = {
  color: '#fff',
  margin: '0 0 10px 0',
  fontSize: '24px',
  fontWeight: 'bold',
}

const headerText = {
  color: '#fff',
  margin: '0',
  fontSize: '14px',
}

const section = {
  backgroundColor: '#ffffff',
  border: '1px solid #e1e8ed',
  borderTop: 'none',
  padding: '25px',
  marginBottom: '0',
}

const h2 = {
  color: '#2c3e50',
  fontSize: '18px',
  margin: '0 0 20px 0',
  paddingBottom: '10px',
  borderBottom: '2px solid #3498db',
  fontWeight: 'bold',
}

const labelCell = {
  padding: '10px 15px 10px 0',
  verticalAlign: 'top' as const,
}

const valueCell = {
  padding: '10px 0',
  verticalAlign: 'top' as const,
}

const label = {
  fontWeight: 'bold' as const,
  color: '#555',
  margin: '0',
  fontSize: '14px',
}

const value = {
  color: '#333',
  margin: '0',
  fontSize: '14px',
}

const list = {
  margin: '10px 0',
  paddingLeft: '20px',
}

const listItem = {
  margin: '5px 0',
  color: '#333',
  fontSize: '14px',
}

const areaBlock = {
  marginBottom: '20px',
  paddingBottom: '15px',
  borderBottom: '1px solid #e1e8ed',
}

const areaTitle = {
  fontWeight: 'bold' as const,
  color: '#2c3e50',
  margin: '0 0 10px 0',
  fontSize: '16px',
}

const commentText = {
  margin: '10px 0 0 0',
  color: '#333',
  whiteSpace: 'pre-wrap' as const,
  fontSize: '14px',
  backgroundColor: '#f8f9fa',
  padding: '15px',
  borderRadius: '6px',
}

const footer = {
  textAlign: 'center' as const,
  padding: '20px',
  borderTop: '1px solid #e1e8ed',
  backgroundColor: '#ffffff',
  borderRadius: '0 0 8px 8px',
}

const footerText = {
  color: '#7f8c8d',
  fontSize: '12px',
  margin: '15px 0 0 0',
}

const footerLogo = {
  display: 'block',
  margin: '0 auto',
}
