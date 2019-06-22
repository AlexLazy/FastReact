import React, { FC, MouseEvent, ChangeEvent, useState } from 'react';

import { FormComponentProps } from 'antd/lib/form/Form';
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Radio,
  Upload,
  Button,
  Icon,
  Card,
  Modal
} from 'antd';
import MaskedInput from 'antd-mask-input';
import letters from '../../letterAssociations';
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface';

const FlyingVehicleForm: FC<FormComponentProps> = ({ form }) => {
  const [avatar, setAvatar] = useState<UploadFile[] | []>([]);
  const [vehicle, setVehicle] = useState<UploadFile[] | []>([]);
  const { getFieldDecorator } = form;

  const handleCyrToLat = (fieldName: string) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const normalizedString = e.currentTarget.value.normalize();
    const str = [...normalizedString];

    str.forEach((character, i) => {
      const isUpperCase = character === character.toUpperCase();
      const char = character.toLowerCase();

      letters[char] &&
        (isUpperCase
          ? (str[i] =
              letters[char].charAt(0).toUpperCase() + letters[char].slice(1))
          : (str[i] = letters[char]));
    });

    form.setFieldsValue({ [fieldName]: str.join('') });
  };

  const handleChangeAvatar = (info: UploadChangeParam) =>
    setAvatar(info.fileList);

  const handleChangeVehicle = (info: UploadChangeParam) =>
    setVehicle(info.fileList);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    form.validateFields(err => {
      if (!err) {
        Modal.success({
          title: 'Спасибо',
          content: 'Ваша заявка принята. Ответ вы получите в смс и по почте.'
        });
        form.resetFields();
        setAvatar([]);
        setVehicle([]);
      }
    });
  };

  return (
    <section
      style={{
        display: 'flex',
        minHeight: 'calc(100% - 64px)',
        marginTop: 30,
        marginBottom: 30
      }}
    >
      <Card
        title='Форма на рассмотрение летательного аппарата'
        style={{ width: 600, margin: 'auto' }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Item label='Имя'>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Поле обязательно к заполнению'
                }
              ]
            })(<Input onChange={handleCyrToLat('usernameLat')} />)}
          </Form.Item>
          <Form.Item label='Имя латиницей'>
            {getFieldDecorator('usernameLat', {})(<Input disabled={true} />)}
          </Form.Item>
          <Form.Item label='Фамилия'>
            {getFieldDecorator('lastname', {
              rules: [
                {
                  required: true,
                  message: 'Поле обязательно к заполнению'
                }
              ]
            })(<Input onChange={handleCyrToLat('lastnameLat')} />)}
          </Form.Item>
          <Form.Item label='Фамилия латиницей'>
            {getFieldDecorator('lastnameLat', {})(<Input disabled={true} />)}
          </Form.Item>
          <Form.Item label='E-mail'>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Невалидная информация'
                },
                {
                  required: true,
                  message: 'Поле обязательно к заполнению'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Номер телефона'>
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: 'Поле обязательно к заполнению' }
              ]
            })(<MaskedInput mask='+7 (111) 111-11-11' />)}
          </Form.Item>
          <Form.Item label='Личная фотография'>
            {getFieldDecorator('avatar', {
              rules: [
                { required: true, message: 'Поле обязательно к заполнению' }
              ]
            })(
              <Upload
                listType='picture-card'
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                fileList={avatar}
                onChange={handleChangeAvatar}
              >
                {avatar.length < 1 && (
                  <div>
                    <Icon type='plus' />
                    <div className='ant-upload-text'>Upload</div>
                  </div>
                )}
              </Upload>
            )}
          </Form.Item>
          <Form.Item label='Название летательного средства'>
            {getFieldDecorator('vehicleName', {
              rules: [
                {
                  required: true,
                  message: 'Поле обязательно к заполнению'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label='Объем двигателя'>
            {getFieldDecorator('capacity', {
              rules: [
                {
                  required: true,
                  message: 'Поле обязательно к заполнению'
                }
              ]
            })(<InputNumber min={0} formatter={value => `${value}л`} />)}
          </Form.Item>
          <Form.Item label='Возможность вернуться из черной дыры'>
            {getFieldDecorator('isComeback')(
              <Switch checkedChildren='Да' unCheckedChildren='Нет' />
            )}
          </Form.Item>
          {form.getFieldValue('isComeback') && (
            <Form.Item label='Вероятность вернуться из черной дыры'>
              {getFieldDecorator('comeback', {
                rules: [
                  {
                    required: true,
                    message: 'Поле обязательно к заполнению'
                  }
                ]
              })(
                <InputNumber
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                />
              )}
            </Form.Item>
          )}
          <Form.Item label='Наличие записывающих средств, позволяющих передавать данные из черной дыры'>
            {getFieldDecorator('recording', { initialValue: 'no' })(
              <Radio.Group>
                <Radio.Button value='yes'>Да</Radio.Button>
                <Radio.Button value='no'>Нет</Radio.Button>
                <Radio.Button value='partial'>Частично</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          {form.getFieldValue('recording') !== 'no' && (
            <Form.Item label='Скорость передачи информации'>
              {getFieldDecorator('recordingSpeed', {
                rules: [
                  {
                    required: true,
                    message: 'Поле обязательно к заполнению'
                  }
                ]
              })(<InputNumber min={0} formatter={value => `${value}Гб/с`} />)}
            </Form.Item>
          )}
          <Form.Item label='Фото летательного транспорта'>
            {getFieldDecorator('photo', {
              rules: [
                { required: true, message: 'Поле обязательно к заполнению' }
              ]
            })(
              <Upload
                listType='picture'
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                fileList={vehicle}
                onChange={handleChangeVehicle}
              >
                <Button>
                  <Icon type='upload' /> Загрузить фото
                </Button>
              </Upload>
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Отправить заявку
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </section>
  );
};

const WrappedFlyingVehicleForm = Form.create({
  name: 'flying_vehicle'
})(FlyingVehicleForm);

export default WrappedFlyingVehicleForm;
